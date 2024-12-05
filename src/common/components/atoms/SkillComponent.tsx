import React from "react";

export default function SkillComponent({ skill }: { skill: string }) {
	return (
		<div className="inline-flex items-center rounded-md border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 px-1 py-0 text-[10px]">
			{skill}
		</div>
	);
}
