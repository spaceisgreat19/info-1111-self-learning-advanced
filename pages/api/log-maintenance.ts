import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const validPriorities = ['Low', 'Medium', 'High'];

function normalizePriority(p: string): string {
  if (!p) return 'Medium';
  const cap = p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
  return validPriorities.includes(cap) ? cap : 'Medium';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    let { apartment, issue, date, completed = false, priority = 'Medium' } = req.body;

    priority = normalizePriority(priority);
    completed = !!completed;

    if (!apartment || !issue || !date) {
      return res.status(400).json({ message: 'Apartment, issue, and date are required.' });
    }

    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ message: `Priority must be one of: ${validPriorities.join(', ')}` });
    }

    try {
      await client.execute({
        sql: "INSERT INTO maintenance_requests (apartment, issue, completed, priority, created_at) VALUES (?, ?, ?, ?, ?)",
        args: [apartment, issue, completed ? 1 : 0, priority, date]
      });

      return res.status(200).json({
        message: `Maintenance request for apartment ${apartment} regarding: ${issue} has been logged.`,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to log maintenance request." });
    }
  }

  if (req.method === 'GET') {
    const { completed, priority, from, to, sort } = req.query;

    let where = [];
    let params: any[] = [];

    if (completed === 'true' || completed === 'false') {
      where.push(`completed = ?`);
      params.push(completed === 'true' ? 1 : 0);
    }

    if (priority && typeof priority === 'string') {
      const p = normalizePriority(priority);
      if (validPriorities.includes(p)) {
        where.push(`priority = ?`);
        params.push(p);
      }
    }

    if (from) {
      where.push(`created_at >= ?`);
      params.push(from);
    }

    if (to) {
      where.push(`created_at <= ?`);
      params.push(to);
    }

    let query = 'SELECT * FROM maintenance_requests';
    if (where.length) {
      query += ' WHERE ' + where.join(' AND ');
    }

    switch (sort) {
      case 'date_desc': query += ' ORDER BY created_at DESC'; break;
      case 'date_asc': query += ' ORDER BY created_at ASC'; break;
      case 'priority_asc': query += ' ORDER BY priority ASC'; break;
      case 'priority_desc': query += ' ORDER BY priority DESC'; break;
    }

    try {
      const result = await client.execute({ sql: query, args: params });
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to fetch filtered requests." });
    }
  }

  if (req.method === 'PUT') {
    const { id, completed, priority, date } = req.body;

    if (typeof id !== 'number') {
      return res.status(400).json({ message: 'Invalid request. ID is required and must be a number.' });
    }

    let setClauses = [];
    let args = [];

    if (typeof completed === 'boolean') {
      setClauses.push("completed = ?");
      args.push(completed ? 1 : 0);
    }

    if (priority) {
      const p = normalizePriority(priority);
      if (!validPriorities.includes(p)) {
        return res.status(400).json({ message: `Priority must be one of: ${validPriorities.join(', ')}` });
      }
      setClauses.push("priority = ?");
      args.push(p);
    }

    if (date) {
      setClauses.push("created_at = ?");
      args.push(date);
    }

    if (setClauses.length === 0) {
      return res.status(400).json({ message: 'No fields to update.' });
    }

    args.push(id);
    const sql = `UPDATE maintenance_requests SET ${setClauses.join(", ")} WHERE id = ?`;

    try {
      await client.execute({ sql, args });
      return res.status(200).json({ message: 'Maintenance request updated.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to update maintenance request." });
    }
  }

  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}