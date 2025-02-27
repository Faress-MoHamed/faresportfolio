"use server";

import db from "@/utils/database/inedx";
import { hashSync } from "bcryptjs";
import { z } from "zod";
import { type FieldPacket, type ResultSetHeader } from "mysql2";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SignUpAction = async (_: any, formData: FormData) => {
	try {
		const { name, email, password } = Object.fromEntries(
			formData.entries()
		) as {
			name: string;
			email: string;
			password: string;
		};
		// Validate name
		const validateName = z.string().min(1, "Name cannot be empty");
		const isValidName = validateName.safeParse(name);
		if (!isValidName.success) {
			return { status: 400, message: "Please enter a valid name" };
		}

		// Validate email
		const validateEmail = z.string().email();
		const isValidEmail = validateEmail.safeParse(email);
		if (!isValidEmail.success) {
			return { status: 400, message: "Please enter a valid email" };
		}

		// Validate password
		const validatePassword = z
			.string()
			.min(6, "The password must be at least 6 characters")
			.max(16, "The max length of the password is 16 characters");
		const isValidPassword = validatePassword.safeParse(password);
		if (!isValidPassword.success) {
			return { status: 400, message: "Please enter a valid password" };
		}

		const [rows] = (await db.execute(`SELECT * FROM users WHERE email = ?`, [
			email,
		])) as [{ id: number; email: string }[], FieldPacket[]];

		const existingUser = rows.length > 0 ? rows[0] : undefined;

		if (existingUser) {
			return { status: 409, message: "Email is already in use" };
		}

		// Hash the password
		const hashedPassword = hashSync(password, 10);

		const [result] = await db.execute<ResultSetHeader>(
			`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
			[name, email, hashedPassword]
		);

		if (result.affectedRows > 0) {
			return {
				id: result.insertId as number,
				email,
				name,
				status: 201,
				message: "Account created successfully",
			};
		} else {
			return { status: 500, message: "Failed to create account" };
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.log(error);
		return {
			success: false,
			message: error.message || "An error occurred, please try again later.",
		};
	}
};
