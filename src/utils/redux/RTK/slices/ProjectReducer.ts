import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	id: "",
	mediaUrls: "",
	title: "",
	description: "",
	skills: "",
	githubLink: "",
	websiteLink: "",
};

const ProjectReducer = createSlice({
	name: "project",
	initialState,
	reducers: {
		editProject: (
			state: {
				id: string;
				mediaUrls: string;
				title: string;
				description: string;
				skills: string;
				githubLink?: string;
				websiteLink?: string;
			},
			action
		) => {
			const {
				id,
				mediaUrls,
				title,
				description,
				skills,
				githubLink,
				websiteLink,
			} = action.payload;

			// Perform mutable updates
			state.id = id;
			state.mediaUrls = mediaUrls;
			state.title = title;
			state.description = description;
			state.skills = skills;
			state.githubLink = githubLink || "";
			state.websiteLink = websiteLink || "";
		},
		reset: () => initialState, // Reset to the initial state
	},
});

export const { editProject, reset } = ProjectReducer.actions;
export default ProjectReducer.reducer;
