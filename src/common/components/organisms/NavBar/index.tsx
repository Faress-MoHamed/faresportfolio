import React from "react";
import ModeSwitch from "../../molecules/mode-switch";
import MobileNavBar from "../../molecules/Mobile-NavBar";
// import LanguageSelect from "../../molecules/language-select";
// import SignOutBtn from "../../molecules/signout-btn";
import UserDetails from "../useer-details/UserDetails";
import NavBarLink from "../../atoms/NavBarLink";
import { cn } from "@/utils/cn-tailwind/utils";

export default function NavBar() {
	return (
		<header
			className={cn(
				"flex justify-between items-center md:pt-4 py-1 my-5",
				"md:dark:bg-transparent max-w-full mx-auto md:bg-transparent md:backdrop-filter-none md:backdrop-blur-none md:rounded-none ",
				"dark:bg-white/40 bg-black/20 backdrop-filter backdrop-blur-lg rounded-full"
			)}
		>
			<ModeSwitch />
			<nav className="md:block hidden w-[60%] py-2 h-[45px] ">
				<ul className=" max-w-[80%] mx-auto flex gap-8 justify-around  h-full">
					{/* {links.map((el, index) => {
						return (
							<NavLinkNavBar path={el.path} key={index} className="capitalize ">
								{el.title}
							</NavLinkNavBar>
						);
					})} */}

					<NavBarLink path="/">Home</NavBarLink>
					<NavBarLink path="/">Projects</NavBarLink>
					<NavBarLink path="/">Blog</NavBarLink>
					<NavBarLink path="/">Contact Us</NavBarLink>
				</ul>
			</nav>
			<div className={"flex items-center justify-between gap-4"}>
				{/* <LanguageSelect /> */}
				<UserDetails />
				<MobileNavBar/>
			</div>
		</header>
	);
}
