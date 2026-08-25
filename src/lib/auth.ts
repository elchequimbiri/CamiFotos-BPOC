import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const SESSIONS_FILE = path.resolve('data/sessions.json');

interface Session {
  token: string;
  role: 'family' | 'admin';
  createdAt: number;
}

function ensureDataDir() {
  const dir = path.dirname(SESSIONS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readSessions(): Record<string, Session> {
  ensureDataDir();
  if (!fs.existsSync(SESSIONS_FILE)) {
    return {};
  }
  const data = fs.readFileSync(SESSIONS_FILE, 'utf-8');
  return JSON.parse(data);
}

function writeSessions(sessions: Record<string, Session>) {
  ensureDataDir();
  fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2));
}

export function createSession(role: 'family' | 'admin'): string {
  const token = crypto.randomBytes(32).toString('hex');
  const sessions = readSessions();
  sessions[token] = { token, role, createdAt: Date.now() };
  writeSessions(sessions);
  return token;
}

export function validateSession(token: string): Session | null {
  const sessions = readSessions();
  const session = sessions[token];
  if (!session) return null;
  // Sessions expire after 24 hours
  if (Date.now() - session.createdAt > 24 * 60 * 60 * 1000) {
    delete sessions[token];
    writeSessions(sessions);
    return null;
  }
  return session;
}

export function deleteSession(token: string) {
  const sessions = readSessions();
  delete sessions[token];
  writeSessions(sessions);
}

export function validatePassword(password: string): 'family' | 'admin' | null {
  if (password === process.env.ADMIN_PASSWORD) return 'admin';
  if (password === process.env.FAMILY_PASSWORD) return 'family';
  return null;
}
