import React from "react";
import ModeSwitch from "../../molecules/mode-switch";
import LanguageSelect from "../../molecules/language-select";
import SignOutBtn from "../../molecules/signout-btn";

export default function NavBar() {
	return (
		<div className="flex justify-evenly pt-4 fixed w-full top-4 z-[99]">
			<ModeSwitch />
			<nav className="dark:bg-white/40 bg-black/20 backdrop-filter backdrop-blur-lg rounded-full w-[60%] py-2 h-[40px] "></nav>
			<LanguageSelect />
			<SignOutBtn />
		</div>
	);
}
