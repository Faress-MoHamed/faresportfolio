/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { cloudinary } from "@/utils/cloudinary/cloudinary";
import projectsdb from "@/utils/database/projects";
import slugify from "slugify";
// import DOMPurify from "dompurify";
import z from "zod";
import xss from "xss";

const projectSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "description is required"),
	skills: z.array(z.string()).min(1),
});

// Function to validate project data
const validateProject = ({
	title,
	description,
	skills,
}: {
	title: string;
	description: string;
	skills: string[];
}) => {
	const validation = projectSchema.safeParse({
		title,
		description,
		skills,
	});

	if (!validation.success) {
		// Return error response
		return {
			status: 400,
			message: "Validation failed",
			errors: validation.error.format(),
		};
	}
};

async function uploadToCloudinary(file: File): Promise<string> {
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	return new Promise((resolve, reject) => {
		cloudinary.uploader
			.upload_stream(
				{
					resource_type: "auto",
					api_key: process.env.CLOUDINARY_API_KEY,
					api_secret: process.env.CLOUDINARY_API_SECRET,
					cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
				},
				(error: any, result: any) => {
					console.log(error);
					if (error) reject(error);
					else resolve(result);
				}
			)
			.end(buffer);
	});
}
// function getPublicIdFromUrl(url: string): string {
// 	const urlParts = url.split("/");
// 	const versionIndex = urlParts.findIndex((part) => part.startsWith("v"));
// 	if (versionIndex !== -1) {
// 		urlParts.splice(versionIndex, 1);
// 	}
// 	const publicIdWithExtension = urlParts.slice(6).join("/");
// 	return publicIdWithExtension.replace(/\.[^/.]+$/, "");
// }
export async function removeFromCloudinary(
	publicId: string,
	resourceType: string = "image"
): Promise<void> {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.destroy(
			publicId,
			{
				resource_type: resourceType,
			},
			(error: any, result: any) => {
				if (error) {
					console.error(error);
					reject(error);
				} else if (result.result !== "ok") {
					reject(new Error(`Failed to delete file: ${result.result}`));
				} else {
					resolve();
				}
			}
		);
	});
}

export async function addProject(
	state: { message: string },
	formData: FormData
) {
	let title = formData.get("title") as string;
	let description = formData.get("description") as string;
	const skills = JSON.parse(formData.get("skills") as string);
	let githubLink = formData.get("githubLink") as string;
	let websiteLink = formData.get("websiteLink") as string;

	const mediaUrls: string[] = [];
	for (const [key, value] of formData.entries()) {
		if (key.startsWith("mediaFile") && value instanceof File) {
			console.log(value);
			const url = await uploadToCloudinary(value);
			mediaUrls.push(url);
		}
	}

	const result = validateProject({
		title,
		description,
		skills,
	});

	if (result?.status === 400) {
		return { status: result.status, message: JSON.stringify(result.errors) };
	}
	title = xss(title);
	description = xss(description);
	githubLink = xss(githubLink);
	websiteLink = xss(websiteLink);
	const projectSlug = slugify(title, {
		lower: true,
	});
	await projectsdb
		.execute(
			`INSERT INTO projects (title, description, skills, slug , mediaUrls, githubLink, websiteLink) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,[title,
			description,
			JSON.stringify(skills),
			projectSlug,
			JSON.stringify(mediaUrls),
			githubLink,
			websiteLink]
		)

	revalidatePath("/dashboard");
	revalidatePath("/");

	return { message: "Project added successfully!" };
}

export async function editProject(
	state: { message: string },
	formData: FormData
) {
	const id = formData.get("id") as string;
	const title = formData.get("title") as string;
	const description = formData.get("description") as string;
	const skills = JSON.parse(formData.get("skills") as string);
	const githubLink = formData.get("githubLink") as string;
	const websiteLink = formData.get("websiteLink") as string;
	const removedImages = JSON.parse(formData.get("removedImages") as string);
	const existingImages = JSON.parse(formData.get("existingImages") as string);

	// Delete removed images from Cloudinary
	for (const { public_id } of removedImages) {
		await removeFromCloudinary(public_id); // Implement this function
	}

	// Collect new media URLs
	const mediaUrls = [...existingImages];
	for (const [key, value] of formData.entries()) {
		if (key.startsWith("mediaFile") && value instanceof File) {
			try {
				const url = await uploadToCloudinary(value);
				mediaUrls.push(url); // Add new URL to mediaUrls array
			} catch (error: any) {
				return { message: `Error uploading file: ${error.message}` };
			}
		}
	}

	const result = validateProject({
		title,
		description,
		skills,
	});

	if (result?.status === 400) {
		return { status: result.status, message: JSON.stringify(result.errors) };
	}

	// Update the project in the database
	try {
		await projectsdb
			.execute(
				`UPDATE projects
             SET title = ?, description = ?, skills = ?, mediaUrls = ?, githubLink = ?, websiteLink = ?
             WHERE id = ?`,[title,
				description,
				JSON.stringify(skills),
				JSON.stringify(mediaUrls),
				githubLink,
				websiteLink,
				id]
			)
	} catch (error: any) {
		return { message: `Error updating project: ${error.message}` };
	}

	revalidatePath("/dashboard");
	revalidatePath("/");

	return { message: "Project updated successfully!" };
}

export async function deleteProject(id: string) {
	await projectsdb.execute("DELETE FROM projects WHERE id = ?",[id])

	revalidatePath("/dashboard");
	revalidatePath("/");
	return { message: "Project deleted successfully!" };
}
