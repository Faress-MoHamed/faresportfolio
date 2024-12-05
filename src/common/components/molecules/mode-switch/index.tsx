"use client";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../../atoms/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn-tailwind/utils";

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

    useEffect(() => {
        setIsDarkMode(theme === "dark");
    }, [theme]);

    const handleSwitch = () => {
        setTheme(isDarkMode ? "light" : "dark");
    };

    return (
        <Button
            className={cn(
                "relative flex items-center justify-center overflow-hidden w-10 rounded-full shadow-none",
                isDarkMode ? "bg-black hover:bg-white/20" : "bg-white hover:bg-gray-200",
                "hover:text-primary-foreground"
            )}
            onClick={handleSwitch}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={isDarkMode ? "dark" : "light"}
                    initial={{ y: -20, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 20, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                >
                    {isDarkMode ? (
                        <Sun className="text-white" size={20} />
                    ) : (
                        <Moon className="text-black" size={20} />
                    )}
                </motion.div>
            </AnimatePresence>
        </Button>
    );
}
