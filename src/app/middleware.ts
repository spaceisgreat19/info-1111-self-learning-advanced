import { NextRequest, NextResponse } from 'next/server';
import cookie from 'cookie';

export function middleware(request: NextRequest) {
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const sessionToken = cookies.session_token;

  // If no session token is found, redirect to the login page
  if (!sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Optionally, you can verify the session token with your database here
  // For now, assume any session_token is valid

  return NextResponse.next();
}

export const config = {
  matcher: ['/protected-page', '/vote'], // List the routes you want to protect here
};