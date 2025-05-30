import { createClient } from '@libsql/client';
import { NextResponse } from 'next/server';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

type Vote = {
  id: number;
  option: string;
  userId: number;
};

export async function GET() {
  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        option TEXT NOT NULL,
        userId INTEGER NOT NULL
      )
    `);

    const result = await client.execute('SELECT * FROM votes');
    const votes = result.rows as unknown as Vote[];

    const yesVotes = votes.filter(vote => vote.option === 'yes').length;
    const noVotes = votes.filter(vote => vote.option === 'no').length;

    return NextResponse.json({ yes: yesVotes, no: noVotes }, { status: 200 });
  } catch (error) {
    console.error('Error fetching votes:', error);
    return NextResponse.json({ message: 'Error fetching votes.' }, { status: 500 });
  }
}