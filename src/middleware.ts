import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
	const nextAuthSessionCookie = (await cookies()).get("next-auth.session-token");
	const nextAuthSessionToken = nextAuthSessionCookie?.value;

	let token;
	if (nextAuthSessionToken) {
		try {
			// Decode or verify token based on your needs
			token = jwt.decode(nextAuthSessionToken);
		} catch (error) {
			console.error("Invalid JWT:", error);
		}
	}

	// Redirect to dashboard if authenticated user visits /auth
	if (request.nextUrl.pathname.startsWith("/auth")) {
		if (token) {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}
	}

	// Redirect to home if unauthenticated user visits /dashboard
	if (request.nextUrl.pathname.startsWith("/dashboard")) {
		if (!token) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}
}

export const config = {
	matcher: ["/auth/:path*", "/dashboard/:path*"],
};
