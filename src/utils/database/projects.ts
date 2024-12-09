import mysql from "mysql2";

const projectsdb = mysql
	.createPool({
		host: process.env.DATABASE_HOST as string,
		user: process.env.DATABASE_USER as string,
		port: parseInt(process.env.DATABASE_PORT || "51539") as number,
		password: process.env.DATABASE_PASSWORD as string,
		database: process.env.DATABASE_SCHEMA as string,
	})
	.promise();

await projectsdb.execute(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title TEXT(255) NOT NULL,
    description TEXT(255) NOT NULL,
    slug TEXT(255) NOT NULL,
    skills TEXT(255) NOT NULL,
    mediaUrls TEXT(255) NOT NULL,
    githubLink TEXT(255),
    websiteLink TEXT(255)
);`);

export default projectsdb;
