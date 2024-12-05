import Link from "next/link";

export default function Footer() {
	return (
		<footer className="flex justify-center align-center pt-10 pb-5 h-20px">
			<p className="text-gray-500  dark:text-gray-400 text-sm">
				© 2024&nbsp;
				<Link href="" target="_blank" rel="noopener noreferrer">
					Fares Mohamed.
				</Link>
				&nbsp; All rights reserved.
			</p>
		</footer>
	);
}
