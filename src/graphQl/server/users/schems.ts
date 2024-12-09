// import db from "@/utils/database/inedx";
// import type { FieldPacket } from "mysql2";

export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    password:String!
  }

  type Query {
    users: [User!]!
    user(email: email!): User
  }

  type Mutation {
    createUser(name: String!, email: String!,password:String!): User
  }
`;

export const resolvers = {
	Query: {
		users: () => {
			// const stmt = db.prepare("SELECT * FROM users");
			// return stmt.all();
		},
		user: (
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			{
			}: {
				id: number;
			}
		) => {
			// const [stmt] = db.execute("SELECT * FROM projects") as [
			// 	any[],
			// 	FieldPacket[]
			// ];
			// return stmt[0];
		},
	},
	Mutation: {
		createUser: (
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			// _: any,
			{
				// name,
				// email,
			}: {
				email: string;
				name: string;
			}
		) => {
			try {
				// const stmt = db.prepare(
				// 	"INSERT INTO users (name, email) VALUES (?, ?)"
				// );
				// const result = stmt.run(name, email);
				// return { id: result.lastInsertRowid, name, email };
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				throw new Error("Failed to create user: " + err.message);
			}
		},
	},
};
