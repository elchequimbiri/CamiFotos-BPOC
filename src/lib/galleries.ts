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

function ensureGalleryDir() {
  if (!fs.existsSync(GALLERY_DIR)) {
    fs.mkdirSync(GALLERY_DIR, { recursive: true });
  }
}

export function getGalleries() {
  ensureGalleryDir();
  const entries = fs.readdirSync(GALLERY_DIR, { withFileTypes: true });

  return entries
    .filter((e) => e.isDirectory())
    .map((entry) => {
      const slug = entry.name;
      const dirPath = path.join(GALLERY_DIR, slug);
      const files = fs.readdirSync(dirPath).filter((f) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));
      const thumbnail = files.find((f) => f.startsWith('00')) || files[0] || '';
      const name = slug.replace(/^\d+/, '').replace(/galeria$/i, '').trim() || slug;

      return {
        slug,
        name,
        thumbnail: thumbnail ? `/img/${slug}/${thumbnail}` : '',
        imageCount: files.length,
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getGalleryImages(slug: string): string[] {
  const dirPath = path.join(GALLERY_DIR, slug);
  if (!fs.existsSync(dirPath)) return [];

  return fs
    .readdirSync(dirPath)
    .filter((f) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
    .sort()
    .map((f) => `/img/${slug}/${f}`);
}

export function galleryExists(slug: string): boolean {
  const dirPath = path.join(GALLERY_DIR, slug);
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}

export function createGallery(slug: string): boolean {
  ensureGalleryDir();
  const dirPath = path.join(GALLERY_DIR, slug);
  if (fs.existsSync(dirPath)) return false;
  fs.mkdirSync(dirPath, { recursive: true });
  return true;
}

export function renameGallery(oldSlug: string, newSlug: string): boolean {
  const oldPath = path.join(GALLERY_DIR, oldSlug);
  const newPath = path.join(GALLERY_DIR, newSlug);
  if (!fs.existsSync(oldPath)) return false;
  if (fs.existsSync(newPath)) return false;
  fs.renameSync(oldPath, newPath);
  return true;
}

export function deleteGallery(slug: string): boolean {
  const dirPath = path.join(GALLERY_DIR, slug);
  if (!fs.existsSync(dirPath)) return false;
  fs.rmSync(dirPath, { recursive: true, force: true });
  return true;
}
