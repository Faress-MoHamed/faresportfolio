import Database from "better-sqlite3";

// Create or connect to SQLite database
const db = new Database("users.db", { verbose: console.log });

// Initialize a table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );
`);

export default db;
