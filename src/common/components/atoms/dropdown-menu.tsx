"use client";

import { cn } from "@/utils/cn-tailwind/utils";
import React, {
	createContext,
	useState,
	useContext,
	useRef,
	useEffect,
} from "react";

interface DropdownContextType {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
	undefined
);

export function Dropdown({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<DropdownContext.Provider value={{ isOpen, setIsOpen }}>
			<div className="relative inline-block text-left" ref={dropdownRef}>
				{children}
			</div>
		</DropdownContext.Provider>
	);
}

export function DropdownTrigger({ children }: { children: React.ReactNode }) {
	const context = useContext(DropdownContext);
	if (!context)
		throw new Error("DropdownTrigger must be used within a Dropdown");

	const { isOpen, setIsOpen } = context;

	return (
		<div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
			{children}
		</div>
	);
}

export function DropdownMenu({ children }: { children: React.ReactNode }) {
	const context = useContext(DropdownContext);
	if (!context) throw new Error("DropdownMenu must be used within a Dropdown");

	const { isOpen } = context;

	if (!isOpen) return null;

	return (
		<div className="origin-top-right absolute right-0 mt-2 w-fit rounded-md shadow-lg bg-white dark:bg-black ring-1 ring-black ring-opacity-5 dark:ring-opacity-25 focus:outline-none">
			<div
				className="py-1"
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="options-menu"
			>
				{children}
			</div>
		</div>
	);
}

export function DropdownItem({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white",
				className
			)}
			role="menuitem"
		>
			{children}
		</div>
	);
}

Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
