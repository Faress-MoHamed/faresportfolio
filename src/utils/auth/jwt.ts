import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET as string;

export const createRefreshToken = (payload: string | object):string => {
	const RefreshToken = jwt.sign(payload, secret, {
		expiresIn: "30d",
		algorithm: "HS256",
	});

	return RefreshToken;
};
export const createAccessToken = (payload: string | object) => {
	const AccessToken = jwt.sign(payload, secret, {
		expiresIn: "24h",
	});

	return AccessToken;
};
