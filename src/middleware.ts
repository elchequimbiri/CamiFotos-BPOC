import { defineMiddleware } from 'astro:middleware';
import { validateSession } from './lib/auth';

const PUBLIC_PATHS = ['/', '/api/login', '/api/logout'];

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  if (PUBLIC_PATHS.includes(url.pathname)) {
    return next();
  }

  // Allow public static resources
  if (url.pathname.startsWith('/recursos/')) {
    return next();
  }

  const token = context.cookies.get('session')?.value;
  if (!token) {
    if (url.pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return context.redirect('/');
  }

  const session = validateSession(token);
  if (!session) {
    context.cookies.delete('session');
    if (url.pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'Session expired' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return context.redirect('/');
  }

  // Block admin-only routes for non-admin users
  if (url.pathname.startsWith('/admin') && session.role !== 'admin') {
    return context.redirect('/gallery');
  }
  if (url.pathname.startsWith('/stats') && session.role !== 'admin') {
    return context.redirect('/gallery');
  }

  context.locals.session = session;
  return next();
});
