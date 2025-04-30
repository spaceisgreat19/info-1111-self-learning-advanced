import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { apartment, issue, completed = false } = req.body;

    if (!apartment || !issue) {
      return res.status(400).json({ message: 'Apartment and issue are required.' });
    }

    try {
      await client.execute({
        sql: "INSERT INTO maintenance_requests (apartment, issue, completed) VALUES (?, ?, ?)",
        args: [apartment, issue, completed]
      });

      return res.status(200).json({
        message: `Maintenance request for apartment ${apartment} regarding: ${issue} has been logged.`,
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to log maintenance request." });
    }
  }

  if (req.method === 'GET') {
    try {
      const result = await client.execute({
        sql: "SELECT * FROM maintenance_requests",
      });

      return res.status(200).json(result.rows);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch maintenance requests." });
    }
  }

  if (req.method === 'PUT') {
    const { id, completed } = req.body;

    if (typeof id !== 'number' || typeof completed !== 'boolean') {
      return res.status(400).json({ message: 'Invalid request.' });
    }

    try {
      await client.execute({
        sql: "UPDATE maintenance_requests SET completed = ? WHERE id = ?",
        args: [completed, id]
      });

      return res.status(200).json({ message: 'Maintenance request updated.' });
    } catch (error) {
      return res.status(500).json({ message: "Failed to update maintenance request." });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}