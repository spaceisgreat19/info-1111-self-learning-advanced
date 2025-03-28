import { NextApiRequest, NextApiResponse } from 'next';

const maintenanceRequests: { apartment: string; issue: string }[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { apartment, issue } = req.body;

    if (!apartment || !issue) {
      return res.status(400).json({ message: 'Apartment and issue are required.' });
    }

    maintenanceRequests.push({ apartment, issue });

    return res.status(200).json({
      message: `Maintenance request for apartment ${apartment} regarding: ${issue} has been logged.`,
    });
  }

  if (req.method === 'GET') {
    return res.status(200).json(maintenanceRequests);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}