import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';
import { logAccess } from '../../lib/stats';

const GALLERY_DIR = path.resolve('gallery');

export const POST: APIRoute = async ({ request, locals }) => {
  const session = locals.session;
  if (!session || session.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const formData = await request.formData();
  const gallery = formData.get('gallery') as string;
  const files = formData.getAll('photos') as File[];

  if (!gallery || files.length === 0) {
    return new Response(JSON.stringify({ error: 'Missing data' }), { status: 400 });
  }

  const galleryPath = path.join(GALLERY_DIR, gallery);
  if (!fs.existsSync(galleryPath)) {
    return new Response(JSON.stringify({ error: 'Gallery not found' }), { status: 404 });
  }

  // Get existing files to determine next number
  const existing = fs.readdirSync(galleryPath).filter((f) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));
  let nextNum = existing.length + 1;

  for (const file of files) {
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `${String(nextNum).padStart(4, '0')}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(galleryPath, filename), buffer);
    nextNum++;
  }

  logAccess('admin', 'upload_photos', `${gallery}: ${files.length} files`);

  return new Response(JSON.stringify({ success: true, count: files.length }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
