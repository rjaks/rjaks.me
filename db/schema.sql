-- Cloudflare D1 Schema for rjaks.me Community Chat / Guestbook
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  nickname TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  ip_hash TEXT
);

CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
