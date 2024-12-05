import Database from "better-sqlite3";

// Create or connect to SQLite database
// const db = new Database("users.db", { verbose: console.log });
const projectsdb = new Database("projects.db");


// Initialize a table if not exists
projectsdb.exec(
	`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        skills TEXT,
        mediaUrls TEXT,
        githubLink TEXT,
        websiteLink TEXT
      );`
    );

export default projectsdb;

