-- Contact form submissions (backup store; email is the source of truth).
-- ip_hash holds a SHA-256 hash of the submitter IP, never the raw IP, to match
-- the privacy policy.
CREATE TABLE IF NOT EXISTS contact_submissions (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  company      TEXT,
  phone        TEXT,
  inquiry_type TEXT NOT NULL,
  message      TEXT NOT NULL,
  user_agent   TEXT,
  ip_hash      TEXT
);
