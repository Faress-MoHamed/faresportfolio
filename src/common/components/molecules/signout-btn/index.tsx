"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/common/components/atoms/button";

export default function SignOutBtn() {
	const { status } = useSession();
	if (status === "authenticated") {
		return (
			<Button
				onClick={() => {
					signOut();
				}}
			>
				Sign Out
			</Button>
		);
	} else {
		return null;
	}
}
