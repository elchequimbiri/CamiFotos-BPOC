import type { APIRoute } from 'astro';
import { createSession, validatePassword } from '../../lib/auth';
import { logAccess } from '../../lib/stats';

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData();
  const password = formData.get('password') as string;

  const role = validatePassword(password);
  if (!role) {
    return new Response(JSON.stringify({ error: 'Invalid password' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const token = createSession(role);
  cookies.set('session', token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 86400,
  });

  logAccess(role, 'login', 'Login');

  return new Response(JSON.stringify({ success: true, role }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
