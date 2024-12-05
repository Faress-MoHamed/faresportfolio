// "use client";

// import { useState } from "react";
// import { deleteProject } from "@/actions/ProjectActions";
import FormProjectCard from "@/common/components/organisms/FormProjectCard";
import projectsdb from "@/utils/database/projects";
// import ProjectForm from "./ProjectForm";

// interface formDashboardProps {
// 	projects: ProjectCardProp[];
// 	onEdit: () => void;
// 	onDelete: () => void;
// }
interface ProjectCardProp {
	id: string;
	mediaUrls: string;
	title: string;
	description: string;
	skills: string;
	GitgubLink?: string;
	webSiteLink?: string;
}
// export default function ProjectList({ projects }: formDashboardProps) {
export default function ProjectList() {
	// const [editingProject, setEditingProject] = useState<ProjectCardProp | null>(
	// 	null
	// );

	// const handleEditProject = (project: ProjectCardProp) => {
	// 	setEditingProject(project);
	// };


	const projects = projectsdb
		.prepare("SELECT * FROM projects")
		.all() as ProjectCardProp[];
	// console.log(projects);

	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Projects</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{projects.map((project) => (
					<FormProjectCard
						key={project.id}
						{...project}
						// onEdit={() => handleEditProject(project)}
						// onDelete={() => handleDeleteProject(project.id)}
					/>
				))}
			</div>
			{/* {editingProject && (
				<ProjectForm
					initialProject={editingProject}
					onCancel={() => setEditingProject(null)}
					onSubmitSuccess={() => {
						setEditingProject(null);
					}}
				/>
			)} */}
		</div>
	);
}
