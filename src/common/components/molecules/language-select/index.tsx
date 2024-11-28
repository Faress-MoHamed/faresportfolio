import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../atoms/dropdown-menu";
import { Button } from "../../atoms/button";

export default function LanguageSelect() {
	return (
		<div className="">
			<DropdownMenu>
				<DropdownMenuTrigger className="focus:outline-none">
					<Button variant="outline">%Lang%</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem className="inline-flex gap-2 w-full cursor-pointer">
						AR
					</DropdownMenuItem>
					<DropdownMenuItem className="inline-flex gap-2 w-full cursor-pointer">
						UK
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
