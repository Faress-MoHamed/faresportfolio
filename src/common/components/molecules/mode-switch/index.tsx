"use client";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../../atoms/button";
import { motion } from "framer-motion"; // Import Framer Motion

export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme(); // Manage theme state
	const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

	const handleSwitch = () => {
		setIsDarkMode((prev) => !prev);
		setTheme(isDarkMode ? "light" : "dark");
	};

	return (
		<Button
			className="relative flex items-center justify-center overflow-hidden w-[50px]"
			onClick={handleSwitch}
		>
			<motion.div
				key={isDarkMode ? "dark" : "light"} // Triggers animation on key change
				initial={{ y: -20, opacity: 0, scale: 0.8 }}
				animate={{ y: 0, opacity: 1, scale: 1 }}
				exit={{ y: 20, opacity: 0, scale: 0.8 }}
				transition={{ duration: 0.3 }}
				className="absolute"
			>
				{!isDarkMode ? (
					<Moon className="text-white " size={20} />
				) : (
					<Sun className="text-yellow-700" size={20} />
				)}
			</motion.div>
		</Button>
	);
}
