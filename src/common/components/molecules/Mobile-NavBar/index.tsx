"use client";
import React, { useState } from "react";
import { Button } from "../../atoms/button";
import { AlignJustify } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileNavBar() {
	const [open, setIsOpen] = useState(false);
	return (
		<div
			
			className={"md:hidden block"}
		>
			<Button onClick={() => {
				setIsOpen(true);
			}}>
				<AlignJustify />
			</Button>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ x: "100px" }}
						animate={{ x: "0" }}
						exit={{ x: "400px" }} 

						transition={{ duration: 0.2 }}
						className={
							"fixed right-0 top-0 h-screen  w-[300px] flex items-center px-5"
						}
					>
						<aside
							className={" bg-red-200 w-[99%] h-[80%] rounded-[10px]"}
						>
							<Button
								onClick={() => {
									setIsOpen(false);
								}}
							>
								X
							</Button>
						</aside>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
