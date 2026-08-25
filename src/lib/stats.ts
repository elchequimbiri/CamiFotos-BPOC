import fs from 'fs';
import path from 'path';

const STATS_FILE = path.resolve('data/stats.json');

interface StatEntry {
  user: string;
  date: string;
  action: string;
  target: string;
}

function ensureDataDir() {
  const dir = path.dirname(STATS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readStats(): StatEntry[] {
  ensureDataDir();
  if (!fs.existsSync(STATS_FILE)) return [];
  const data = fs.readFileSync(STATS_FILE, 'utf-8');
  return JSON.parse(data);
}

function writeStats(stats: StatEntry[]) {
  ensureDataDir();
  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
}

export function logAccess(user: string, action: string, target: string) {
  const stats = readStats();
  stats.push({
    user,
    date: new Date().toISOString(),
    action,
    target,
  });
  writeStats(stats);
}

export function getStats(): StatEntry[] {
  return readStats().sort((a, b) => b.date.localeCompare(a.date));
}
