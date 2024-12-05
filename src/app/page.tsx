import Hero from "@/common/components/templates/Hero";
import Divider from "@/common/components/atoms/divider";
import MyProjects from "@/common/components/templates/MyProjects";
import NavBar from "@/common/components/organisms/NavBar";
export default function Home() {
	return (
		<>
			<NavBar />
			<main className={"flex flex-col min-h-[100dvh] space-y-10"}>
				<Hero />
				<Divider />
				<MyProjects />
			</main>
		</>
	);
}
