"use client";
import React, { useEffect, type FC } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import LoadingPage from "../../common/components/molecules/loading/index";

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const { status } = useSession();
	const router = useRouter();
	const currentPath = usePathname();

	useEffect(() => {
		if (status === "loading") return;

		if (
			status === "unauthenticated" &&
			(currentPath.startsWith("/dashboard"))
		) {
			router.push("/auth/signin");
		}

		if (
			status === "authenticated" &&
			(currentPath.startsWith("/auth"))
		) {
			router.push("/dashboard");
		}
	}, [status, currentPath, router]);

	if (status === "loading" || status === undefined) {
		return <LoadingPage />;
	}

	return <>{children}</>;
};

export default AuthProvider;
