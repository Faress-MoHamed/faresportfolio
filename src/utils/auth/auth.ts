import { z } from "zod";
import { compareSync } from "bcryptjs";
import db from "../database/inedx";
import type { FieldPacket } from "mysql2";

interface LoginSuccess {
	name: string;
	email: string;
	id: string;
	status?: number;
	message?: string;
	password?: undefined;
}
interface LoginError {
	status: number;
	message: string;
	password?: undefined;
	email?: undefined;
	id?: undefined;
}

type LoginResponse = LoginSuccess | LoginError;

export const loginFunction = async (
	email: string,
	password: string
): Promise<LoginResponse> => {
	//check if email is valid
	const validateEmail = z.string().email();
	const isValidEmail = validateEmail.safeParse(email);

	if (!isValidEmail.success) {
		return { status: 400, message: "please enter valid email" };
	}
	//checl if password is valid
	const validatepassword = z
		.string()
		.max(16, "the max length of password is 16 char");
	const isValidpassword = validatepassword.safeParse(password);
	if (!isValidpassword.success) {
		return { status: 400, message: "please enter valid password" };
	}
	//get user from database by email
	const [rows] = (await db.execute(`SELECT * FROM users where email = ?`, [
		email,
	])) as [
		{ email: string; id: string; password: string; name: string }[],
		FieldPacket[]
	];

	const userExist = rows.length > 0 ? rows[0] : undefined;

	//check if user doesn't exist
	if (!userExist) {
		return { status: 404, message: "This user is not exist" };
	}
	const checkPasswordCorrect = compareSync(password, userExist.password);
	if (!checkPasswordCorrect) {
		return {
			status: 401,
			message: "the password is wrong ! please enter your correct password",
		};
	}
	return {
		email: userExist.email,
		id: userExist.id,
		name: userExist.name,
		password: undefined,
		message: "signed in successfully",
		status: 200,
	};
};
