/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { addProject, editProject } from "@/actions/ProjectActions";
import { reset } from "@/utils/redux/RTK/slices/ProjectReducer";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

export default function ProjectForm() {
	const dispatch = useDispatch();

	const project = useSelector(
		(state: {
			project: {
				id: string;
				mediaUrls: string;
				title: string;
				description: string;
				skills: string;
				githubLink?: string;
				websiteLink?: string;
			};
		}) => state.project
	);
	// console.log(JSON.parse(project.mediaUrls as string||""))
	const [state, replacedAction] = useFormState(
		project.id !== "" ? editProject : addProject,
		{
			message: "",
		}
	);

	const [files, setFiles] = useState<File[]>([]);
	const [pickedImage, setPickedImage] = useState<string[]>([]);
	const [removedImages, setRemovedImages] = useState<{ public_id: string }[]>(
		[]
	);

	const [existingImage, setExistingImage] = useState<
		{ url: string; public_id: string }[]
	>([]);
	const [skills, setSkills] = useState<string[]>([]);
	const [newSkill, setNewSkill] = useState("");

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const file = e.target.files[0];
		if (!file) return;
		setFiles((prevFiles) => [...prevFiles, file]);
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPickedImage((prevImages: string[]) => [
				...prevImages,
				fileReader.result as string,
			]);
		};
		fileReader.readAsDataURL(file);
	};

	useEffect(() => {
		if (project.id) {
			const imagesCloudinary = JSON.parse(project.mediaUrls) as {
				url: string;
				public_id: string;
			}[];
			imagesCloudinary.map((el) => {
				setExistingImage((prevEl) => [...prevEl, el]);
			});

			const skillsFromDb = JSON.parse(project.skills) as string[];
			skillsFromDb.map((el) => {
				setSkills((prevEl) => [...prevEl, el]);
			});
		}
	}, [project]);
	const handleDeleteFromCloudinary = (publicId: string, index: number) => {
		setRemovedImages((prev) => [...prev, { public_id: publicId }]);
		setExistingImage((prevFiles) => prevFiles.filter((_, i) => i !== index));
	};

	const handleRemoveImage = (index: number) => {
		setPickedImage((prevFiles) => prevFiles.filter((_, i) => i !== index));
	};

	const handleAddSkill = (e: React.FormEvent) => {
		e.preventDefault();
		if (newSkill.trim() !== "") {
			setSkills([...skills, newSkill.trim()]);
			setNewSkill("");
		}
	};

	// Function to reset the form state
	const resetForm = () => {
		// Reset all state variables to their initial values
		setFiles([]);
		setPickedImage([]);
		setExistingImage([]);
		setSkills([]);
		setNewSkill("");

		// Reset form input values (optional, depending on your setup)
		if (fileInputRef.current) fileInputRef.current.value = "";
		dispatch(reset());
	};

	const handleSubmit = async (formData: FormData) => {
		// Add new files to FormData
		files.forEach((file, index) => {
			formData.append(`mediaFile${index}`, file);
		});

		// Add updated skills
		formData.append("skills", JSON.stringify(skills));

		// Add remaining existing images
		const retainedImages = existingImage.filter(
			(img) =>
				!removedImages.some((removed) => removed.public_id === img.public_id)
		);
		formData.append("existingImages", JSON.stringify(retainedImages));

		// Pass removed images for cleanup
		formData.append("removedImages", JSON.stringify(removedImages));

		// Perform the action
		replacedAction(formData);

		// Reset form
		resetForm();
	};

	return (
		<React.Fragment>
			<form
				action={handleSubmit}
				className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
			>
				{project.id !== "" && (
					<input type={"hidden"} value={project.id} name="id" />
				)}
				<h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
					{"Add New Project"}
				</h2>
				<div className="mb-4">
					<label
						className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
						htmlFor="title"
					>
						Title
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500"
						id="title"
						type="text"
						name="title"
						required
						defaultValue={project.title}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
						htmlFor="description"
					>
						Description
					</label>
					<textarea
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500"
						id="description"
						name="description"
						required
						defaultValue={project.description}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
						htmlFor="mediaFiles"
					>
						Media Files
					</label>
					<input
						type="file"
						id="mediaFiles"
						onChange={handleAddFile}
						multiple
						accept="image/*,video/*"
						ref={fileInputRef}
						className="hidden"
					/>
					<button
						type="button"
						onClick={() => fileInputRef.current?.click()}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Select Files
					</button>
					<div className="mt-2">
						{pickedImage.map((file, index) => (
							<div
								key={index}
								className="flex items-center justify-between flex-col text-sm text-gray-600 dark:text-gray-300 mb-1"
							>
								<div className="max-w-[150px]">
									<Image
										alt=""
										src={file}
										width={150}
										height={150}
										className="w-full h-auto"
									/>
								</div>
								<button
									type="button"
									onClick={() => {
										handleRemoveImage(index);
									}}
									className="text-red-500 hover:text-red-700"
								>
									Remove
								</button>
							</div>
						))}
						{existingImage.map((el, index) => (
							<div
								key={index}
								className="flex items-center justify-between flex-col text-sm text-gray-600 dark:text-gray-300 mb-1"
							>
								<div className="max-w-[150px]">
									<Image
										alt=""
										src={el.url}
										width={150}
										height={150}
										className="w-full h-auto"
									/>
								</div>
								<button
									type="button"
									onClick={() => {
										handleDeleteFromCloudinary(el.public_id, index);
									}}
									className="text-red-500 hover:text-red-700"
								>
									Remove
								</button>
							</div>
						))}
					</div>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
						htmlFor="skills"
					>
						Skills
					</label>
					<div className="flex items-center">
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 mr-2"
							id="skills"
							type="text"
							onChange={(e) => setNewSkill(e.target.value)}
							placeholder="Enter a skill"
						/>
						<button
							onClick={handleAddSkill}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="button"
						>
							Add Skill
						</button>
					</div>
					<div className="mt-2 flex flex-wrap gap-2">
						{skills.map((skill, index) => (
							<span
								key={index}
								className="bg-gray-200 dark:bg-gray-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300"
							>
								{skill}
							</span>
						))}
					</div>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
						htmlFor="githubLink"
					>
						GitHub Link (optional)
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500"
						id="githubLink"
						type="url"
						name="githubLink"
						defaultValue={project.githubLink}
					/>
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
						htmlFor="websiteLink"
					>
						Website Link (optional)
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500"
						id="websiteLink"
						type="url"
						name="websiteLink"
						defaultValue={project.websiteLink}
					/>
				</div>
				<div className="flex items-center justify-between">
					<Submit>{project.id !== "" ? "Edit Project" : "Add Project"}</Submit>
					{project.id!==""&&<Cancel onClick={() => resetForm()}>{"cancel"}</Cancel>}
				</div>

				{state.message && (
					<p className="mt-4 text-green-600 dark:text-green-400">
						{state.message}
					</p>
				)}
			</form>
		</React.Fragment>
	);
}

function Submit({ children }: { children: React.ReactNode }) {
	const { pending } = useFormStatus();
	return (
		<button
			className={`${
				pending ? "bg-black/10" : "bg-blue-500 hover:bg-blue-700"
			} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
			type="submit"
			disabled={pending}
		>
			{children}
		</button>
	);
}

interface CancelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}
const Cancel: React.FC<CancelProps> = ({ children, ...props }) => {
	const { pending } = useFormStatus();

	return (
		<button
			{...props}
			className={`${
				pending
					? "bg-black/10 cursor-not-allowed"
					: "bg-blue-500 hover:bg-blue-700"
			} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
			disabled={pending}
		>
			{children}
		</button>
	);
};
