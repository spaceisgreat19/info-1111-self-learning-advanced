import { NextRequest, NextResponse } from 'next/server';
import * as cookie from 'cookie';

export async function middleware(request: NextRequest) {
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const sessionToken = cookies.session_token;

  // If no session token is found, redirect to the login page
  if (!sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/protected-page', '/vote'], 
};