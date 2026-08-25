import type { APIRoute } from 'astro';
import { deleteSession } from '../../lib/auth';

export const GET: APIRoute = async ({ cookies, redirect }) => {
  const token = cookies.get('session')?.value;
  if (token) {
    deleteSession(token);
    cookies.delete('session');
  }
  return redirect('/');
};
