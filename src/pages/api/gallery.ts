import type { APIRoute } from 'astro';
import { createGallery, renameGallery, deleteGallery } from '../../lib/galleries';
import { logAccess } from '../../lib/stats';

export const POST: APIRoute = async ({ request, locals }) => {
  const session = locals.session;
  if (!session || session.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const data = await request.json();
  const { action, slug, newName } = data;

  let success = false;
  if (action === 'create') {
    success = createGallery(slug);
    logAccess('admin', 'create_gallery', slug);
  } else if (action === 'rename') {
    success = renameGallery(slug, newName);
    logAccess('admin', 'rename_gallery', `${slug} -> ${newName}`);
  } else if (action === 'delete') {
    success = deleteGallery(slug);
    logAccess('admin', 'delete_gallery', slug);
  }

  return new Response(JSON.stringify({ success }), {
    status: success ? 200 : 400,
    headers: { 'Content-Type': 'application/json' },
  });
};
