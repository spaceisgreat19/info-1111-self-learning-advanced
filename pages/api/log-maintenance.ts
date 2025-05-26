import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const validPriorities = ['Low', 'Medium', 'High'];

function normalizePriority(p: any): string {
  if (typeof p !== 'string') return 'Medium';
  const formatted = p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
  return validPriorities.includes(formatted) ? formatted : 'Medium';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'POST': {
        const { apartment, issue, date = new Date().toISOString(), completed = false, priority = 'Medium' } = req.body;

        if (!apartment || !issue) {
          return res.status(400).json({ message: 'Apartment and issue are required.' });
        }

        const normalizedPriority = normalizePriority(priority);

        await client.execute({
          sql: `INSERT INTO maintenance_requests (apartment, issue, completed, priority, created_at) VALUES (?, ?, ?, ?, ?)`,
          args: [apartment, issue, completed ? 1 : 0, normalizedPriority, date]
        });

        return res.status(200).json({ message: `Request logged for apartment ${apartment}.` });
      }

      case 'GET': {
        const { completed, priority, from, to, sort } = req.query;
        const conditions: string[] = [];
        const params: any[] = [];

        if (completed === 'true' || completed === 'false') {
          conditions.push('completed = ?');
          params.push(completed === 'true' ? 1 : 0);
        }

        if (priority) {
          conditions.push('priority = ?');
          params.push(normalizePriority(priority));
        }

        if (from && typeof from === 'string' && !isNaN(Date.parse(from))) {
          conditions.push('created_at >= ?');
          params.push(from);
        }

        if (to && typeof to === 'string' && !isNaN(Date.parse(to))) {
          conditions.push('created_at <= ?');
          params.push(to);
        }

        let query = `SELECT * FROM maintenance_requests`;
        if (conditions.length) {
          query += ` WHERE ` + conditions.join(' AND ');
        }

        const sortMap: Record<string, string> = {
          'date_desc': 'created_at DESC',
          'date_asc': 'created_at ASC',
          'priority_asc': 'priority ASC',
          'priority_desc': 'priority DESC'
        };

        query += ` ORDER BY ${sortMap[sort as string] || 'created_at DESC'}`;

        const result = await client.execute({ sql: query, args: params });
        return res.status(200).json(result.rows);
      }

      case 'PUT': {
        const { id, apartment, issue, completed, priority, date } = req.body;

        if (typeof id !== 'number') {
          return res.status(400).json({ message: 'ID is required and must be a number.' });
        }

        const updates: string[] = [];
        const params: any[] = [];

        if (typeof apartment === 'string') {
          updates.push('apartment = ?');
          params.push(apartment);
        }

        if (typeof issue === 'string') {
          updates.push('issue = ?');
          params.push(issue);
        }

        if (typeof completed === 'boolean') {
          updates.push('completed = ?');
          params.push(completed ? 1 : 0);
        }

        if (priority) {
          updates.push('priority = ?');
          params.push(normalizePriority(priority));
        }

        if (typeof date === 'string' && !isNaN(Date.parse(date))) {
          updates.push('created_at = ?');
          params.push(date);
        }

        if (!updates.length) {
          return res.status(400).json({ message: 'No valid fields to update.' });
        }

        params.push(id);
        const sql = `UPDATE maintenance_requests SET ${updates.join(', ')} WHERE id = ?`;

        await client.execute({ sql, args: params });
        return res.status(200).json({ message: 'Maintenance request updated.' });
      }

      case 'OPTIONS': {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
      }

      default:
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', error: error instanceof Error ? error.message : String(error) });
  }
}