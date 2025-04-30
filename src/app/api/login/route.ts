import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';
import cookie from 'cookie';
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
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    const sessionToken = crypto.randomBytes(64).toString('hex');

    const headers = new Headers();
    headers.append(
      'Set-Cookie',
      cookie.serialize('session_token', sessionToken, {
        httpOnly: false,  // <-- FIXED THIS
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
        sameSite: 'lax',   // <-- added sameSite
      })
    );

    return NextResponse.json({ message: 'Login successful' }, { status: 200, headers });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ message: 'Server error while logging in.' }, { status: 500 });
  }
}