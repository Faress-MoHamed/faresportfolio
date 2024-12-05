/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React from "react";
import Fares from "@/assets/fares.jpg";
import Link from "next/link";
import SocialMediaAccounts from "@/common/components/molecules/socialmedia-accounts";

export default function Hero() {
	return (
		<section className="mb-5">
			{/* image */}
			<Image
				className="rounded-full cursor-pointer hover:grayscale mb-5 w-[100px] h-[100px] object-cover"
				src={Fares}
				width={100}
				height={100}
				alt="fares avatar"
				loading="lazy"
			/>
			<h2 className="text-2xl font-bold">Fares Mohamed</h2>
			<div className="text-gray-700 dark:text-gray-300">
				<p className="mt-4">
					I’m a passionate MERN stack developer specializing in building
					scalable web applications with dynamic, responsive user interfaces.
				</p>
				<p className="mt-4 mb-4">
					Currently, I'm working at &nbsp;
					<Link
						href="https://Qumra.com"
						target="_blank"
						className="border-b inline-block"
					>
						Qumra
					</Link>
					&nbsp; , leveraging modern web technologies to create innovative
					solutions. Over the years, I've gained experience in full-stack
					development, working on diverse projects in various domains, including
					insurance, game-tech, and video streaming.
				</p>
				<p className="mb-4">
					If you'd like to collaborate, please&nbsp;
					<a
						href="mailto:fareess.mohameedd@email.com"
						className="border-b inline-block"
					>
						send me an email
					</a>
					&nbsp;or reach out on any of my social handles.
				</p>
			</div>

			<SocialMediaAccounts />
			<p className="mt-4 border-b inline-block cursor-pointer">
				<Link href="" target="_blank" rel="noopener noreferrer">
					View Resume
				</Link>
			</p>
		</section>
	);
}
