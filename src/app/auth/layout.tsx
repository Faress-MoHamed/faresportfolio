import { Card } from "@/common/components/atoms/card";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<section className="w-full h-screen flex justify-center items-center">
			<Card className="w-[400px]">{children}</Card>
		</section>
	);
}
