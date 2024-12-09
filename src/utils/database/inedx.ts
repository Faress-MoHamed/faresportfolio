import mysql from "mysql2";

// create the connection to database
const db = mysql
	.createPool({
		host: process.env.DATABASE_HOST as string,
		user: process.env.DATABASE_USER as string,
		port: parseInt(process.env.DATABASE_PORT || "51539") as number,
		password: process.env.DATABASE_PASSWORD as string,
		database: process.env.DATABASE_SCHEMA as string,
	})
	.promise();

await db.execute(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name TEXT NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL
);

`);

export default db;
