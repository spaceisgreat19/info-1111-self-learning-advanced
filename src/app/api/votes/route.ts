import { createClient } from '@libsql/client';
import { NextResponse } from 'next/server';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

// Define the expected structure of a vote
type Vote = {
  id: number;
  option: string;
  userId: number;
};

export async function GET() {
  try {
    // Create the table if it doesn't exist
    await client.execute(`
      CREATE TABLE IF NOT EXISTS votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        option TEXT NOT NULL,
        userId INTEGER NOT NULL
      )
    `);

    // Fetch all votes from the 'votes' table
    const result = await client.execute('SELECT * FROM votes');
    
    // Ensure correct typing by mapping rows to the Vote type
    const votes: Vote[] = result.rows.map((row: any) => ({
      id: row.id,
      option: row.option,
      userId: row.userId,
    }));

    // Count the votes based on option
    const yesVotes = votes.filter(vote => vote.option === 'yes').length;
    const noVotes = votes.filter(vote => vote.option === 'no').length;

    return NextResponse.json({ yes: yesVotes, no: noVotes }, { status: 200 });
  } catch (error) {
    console.error('Error fetching votes:', error);
    return NextResponse.json({ message: 'Error fetching votes.' }, { status: 500 });
  }
}