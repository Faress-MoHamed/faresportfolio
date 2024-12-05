import React from "react";
import Header from "../../molecules/Header";
import type { ProjectCardProp } from "../../organisms/ProjectCard/ProjectCard.types";
import ProjectCard from "../../organisms/ProjectCard";
import projectsdb from "@/utils/database/projects";

export default function MyProjects() {
	const projectsPrepare = projectsdb.prepare("SELECT * FROM projects");
	const projects: ProjectCardProp[] = projectsPrepare.all() as ProjectCardProp[];
	return (
		<section id="projects">
			<div className="space-y-12 w-full py-12">
				<Header
					headLine1={"My projects"}
					headLine2={"Check out my latest work"}
					subHeadLine={
						"I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites."
					}
				/>
				<div
					className={
						"grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto"
					}
				>
					{projects.map((el) => {
						return <ProjectCard key={el.title} {...el} />;
					})}
				</div>
			</div>
		</section>
	);
}