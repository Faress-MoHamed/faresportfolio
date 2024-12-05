// "use client";

// import { useState, useEffect, useCallback } from "react";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";
// import type { ProjectCardProp } from "@/common/components/organisms/ProjectCard/ProjectCard.types";
// import { getProjects, deleteProject } from "@/actions/ProjectActions";

export default function Page() {

	return (
		<div>
			<h1 className="text-3xl font-bold mb-6">Project Dashboard</h1>
				{/* Project Form for creating or editing a project */}
				<ProjectForm
					// onSubmitSuccess={handleProjectSubmit}
				/>

				{/* Project List to display all projects */}
				<ProjectList
				/>
		</div>
	);
}
