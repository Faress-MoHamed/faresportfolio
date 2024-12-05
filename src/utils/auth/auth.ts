import { z } from "zod";
import { compareSync } from "bcryptjs";
// import { createAccessToken, createRefreshToken } from "./jwt";
import db from "../database/inedx";

interface LoginSuccess {
	name: string;
	email: string;
	id: string;
	status?: number; // Optional status for consistency
	message?: string; // Optional status for consistency
	password?: undefined; // Password is explicitly undefined for security
}

// Error response type (when validation or login fails)
interface LoginError {
	status: number;
	message: string;
	password?: undefined;
	email?: undefined;
	id?: undefined;
}

// Combine types for the return value
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
	const userExist = db
		.prepare(`SELECT * FROM users where email = ?`)
		.get(email) as
		| { email: string; id: string; password: string; name: string }
		| undefined;
	//check if user doesn't exist
	if (!userExist) {
		return { status: 404, message: "This user is not exist" };
	}
	//compare between passwords
	const checkPasswordCorrect = compareSync(password, userExist.password);
	if (!checkPasswordCorrect) {
		return {
			status: 401,
			message: "the password is wrong ! please enter your correct password",
		};
	}

	// const refreshToken: string = createRefreshToken(userExist);
	// const AccessToken: string = createAccessToken(userExist);

	// (await cookies()).set("refreshToken", refreshToken);
	// (await cookies()).set("accessToken", AccessToken);
	return {
		email: userExist.email,
		id: userExist.id,
		name: userExist.name,
		password: undefined, // Explicitly omit password for security
		message: "signed in successfully",
		status: 200,
	};
};
