"use client";

import { useEffect, useState, type ReactNode } from "react";

export default function FirstMountedProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	} else {
		<>{children}</>;
	}
}
