import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				hostname: "res.cloudinary.com",
				pathname: "/**", // Matches all image paths
			},
		],
	},
};

export default nextConfig;
