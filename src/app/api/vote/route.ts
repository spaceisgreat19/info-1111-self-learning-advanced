import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const { option, userId } = await request.json();

    // Check if required fields are missing
    if (!option || !userId) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    // Insert the new vote into the database
    const result = await client.execute({
      sql: 'INSERT INTO votes (option, userId) VALUES (?, ?)',
      args: [option, userId],
    });

    // Convert the BigInt to a string before returning it in the response
    const id = result.lastInsertRowid.toString(); // Convert to string

    return NextResponse.json({ id, option, userId }, { status: 201 });
  } catch (error) {
    console.error('Error creating vote:', error);
    return NextResponse.json({ message: 'Server error while creating vote.' }, { status: 500 });
  }
}