import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { loginFunction } from "./../auth/auth";
import jwt from "jsonwebtoken";
import type { JWT } from "next-auth/jwt";

const MAX_AGE = 1 * 24 * 60 * 60;

export const NextOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "credentials",
			authorize: async (credentials) => {
				const user = (await loginFunction(
					credentials?.email as string,
					credentials?.password as string
				)) as {
					email: string;
					id: number;
				};
				return user;
			},
			credentials: {
				email: {
					label: "email",
					type: "text",
				},
				password: {
					label: "password",
					type: "password",
				},
			},
		}),
		GoogleProvider({
			clientId:
				"153054831459-q2aadtpf8s9l9hco50amc4i98v164vfa.apps.googleusercontent.com",
			clientSecret: "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",
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		async session({ session, token }: any) {
			session.user = token.user;
			return session;
		},
	},
	jwt: {
		maxAge: MAX_AGE,
		async encode({ token, secret }): Promise<string> {
			if (!token) {
				throw new Error("Token is undefined");
			}
			const { sub, ...tokenProps } = token;
			// Get the current date in seconds since the epoch
			const nowInSeconds = Math.floor(Date.now() / 1000);

			// Calculate the expiration timestamp
			const expirationTimestamp = nowInSeconds + MAX_AGE;
			const jwtToken = jwt.sign(
				{ uid: sub, ...tokenProps, exp: expirationTimestamp },
				secret,
				{
					algorithm: "HS256",
				}
			);
			return jwtToken;
		},
		async decode({ token, secret }): Promise<JWT | null> {
			if (!token) {
				throw new Error("Token is undefined");
			}
			try {
				const decodedToken = jwt.verify(token, secret, {
					algorithms: ["HS256"],
				});
				return decodedToken as JWT;
			} catch (error) {
				console.error("JWT decode error", error);
				return null;
			}
		},
	},
	pages: {
		signIn: "/auth/signin",
	},
};
