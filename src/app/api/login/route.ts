import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import crypto from 'crypto';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ message: 'Missing username or password.' }, { status: 400 });
    }

    const result = await client.execute({
      sql: 'SELECT * FROM users WHERE username = ?',
      args: [username],
    });

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    const user = result.rows[0];

    if (!user.password) {
      return NextResponse.json({ message: 'Password not found.' }, { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, String(user.password));

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    const sessionToken = crypto.randomBytes(64).toString('hex');

    const headers = new Headers();
    headers.append(
      'Set-Cookie',
      serialize('session_token', sessionToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
        sameSite: 'lax',
      })
    );

    return NextResponse.json({ message: 'Login successful' }, { status: 200, headers });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ message: 'Server error while logging in.' }, { status: 500 });
  }
}