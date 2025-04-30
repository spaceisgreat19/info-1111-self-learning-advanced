import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});


interface VoteRequestBody {
  option: string;
  userId: number;
}

export async function POST(request: NextRequest) {
  try {
    const { option, userId }: VoteRequestBody = await request.json();

    if (!option || !userId) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    const result = await client.execute({
      sql: 'INSERT INTO votes (option, userId) VALUES (?, ?)',
      args: [option, userId],
    });

    const id = result.lastInsertRowid?.toString() || '';

    return NextResponse.json({ id, option, userId }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Server error while creating vote.' }, { status: 500 });
  }
}