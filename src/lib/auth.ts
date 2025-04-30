'use client';

import Cookie from 'js-cookie';

export function isAuthenticated() {
  if (typeof window === 'undefined') {
    return false; // Always false on server side
  }
  return !!Cookie.get('session_token');
}