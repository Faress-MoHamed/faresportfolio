import React from "react";
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuGroup,
// 	DropdownMenuItem,
// 	DropdownMenuLabel,
// 	DropdownMenuSeparator,
// 	DropdownMenuTrigger,
// } from "../../atoms/dropdown-menu";
import {  User } from "lucide-react";
import SignOutBtn from "../signout-btn";
import {Dropdown} from "../../atoms/dropdown-menu";

export default function DropDownUser({
	email,
	name,
}: {
	email: string;
	name: string;
}) {
	return (
		<div className={"relative"}>
			<Dropdown>
				<Dropdown.Trigger>
						<div className={"flex w-full items-center gap-2"}>
							<User
								className={
									"bg-gray-200 text-black md:w-8 md:h-8 w-5 h-5 rounded-full"
								}
							/>
							<span className={"text-xs "}>{name}</span>
						</div>
				</Dropdown.Trigger>
				<Dropdown.Menu>
					<Dropdown.Item>{email}</Dropdown.Item>
					<Dropdown.Item>Settings</Dropdown.Item>
					<Dropdown.Item className="w-full"><SignOutBtn/></Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
}
