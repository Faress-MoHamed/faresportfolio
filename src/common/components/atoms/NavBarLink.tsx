import { cn } from "@/utils/cn-tailwind/utils";
import Link from "next/link";
import React, { type ReactNode } from "react";
import { Edu_AU_VIC_WA_NT_Hand } from "next/font/google";

interface NavBarLinkProp {
	path: string;
	children: ReactNode | string;
	className?: string;
}
const Edu_Au = Edu_AU_VIC_WA_NT_Hand({
	subsets: ["latin"],
});

export default function NavBarLink({
	children,
	className,
	path,
}: NavBarLinkProp) {
	return (
		<Link
			href={path}
			className={cn(
				" text-black/80 hover:text-black/60 transition-colors duration-300 md:before:left-2/4  md:before:bottom-0  md:before:w-0  md:before:h-[2px]  md:before:bg-black  md:before:absolute md:after:right-2/4  md:after:bottom-0  md:after:w-0  md:after:h-[2px]  md:after:bg-black  md:after:absolute  md:relative md:overflow-x-hidden  md:hover:before:w-full  md:before:duration-300  md:hover:before:bg-black/60 md:hover:after:w-full  md:after:duration-300  md:hover:after:bg-black/60 whitespace-nowrap",
				"dark:text-white dark:hover:text-white dark:md:before:bg-white dark:md:after:bg-white dark:md:hover:before:bg-white dark:md:hover:after:bg-white",
				Edu_Au.className,
				className
			)}
		>
			{children}
		</Link>
	);
}
