import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

const GALLERY_DIR = path.resolve('gallery');

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;
  const filename = params.filename;

  if (!slug || !filename) {
    return new Response('Not found', { status: 404 });
  }

  const ext = path.extname(filename).toLowerCase();
  const mime = MIME_TYPES[ext];
  if (!mime) {
    return new Response('Not found', { status: 404 });
  }

  const filePath = path.join(GALLERY_DIR, slug, filename);
  const resolved = path.resolve(filePath);

  if (!resolved.startsWith(GALLERY_DIR)) {
    return new Response('Forbidden', { status: 403 });
  }

  if (!fs.existsSync(resolved)) {
    return new Response('Not found', { status: 404 });
  }

  const fileBuffer = fs.readFileSync(resolved);

  return new Response(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': mime,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
