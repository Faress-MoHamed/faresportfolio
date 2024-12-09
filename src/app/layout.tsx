import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/themeProvider";
// import ApolloProvider from "@/providers/apolloProvider";
import SessionProvider from "@/providers/sessionProvider";
import AuthProvider from "@/providers/AuthProvider";
import ToasterProvider from "@/providers/reactHotToast-Provider";
import ReduxProvider from "@/providers/reduxProvider";
import { Space_Grotesk } from "next/font/google";
import Footer from "@/common/components/templates/footer";

const Space = Space_Grotesk({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "Fares Mohamed",
	description: "Front end developer | MERN stack",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/images/favicon.ico" sizes="any" />
			</head>
			<body
				className={`${Space.className} min-h-screen bg-background font-sans max-w-2xl mx-auto px-6`}
			>
				<ReduxProvider>
					<SessionProvider>
						<AuthProvider>
							{/* <ApolloProvider> */}
								<ThemeProvider
									attribute="class"
									defaultTheme="system"
									enableSystem
									disableTransitionOnChange
								>
									<ToasterProvider />
									{children}
									<Footer />
								</ThemeProvider>{" "}
							{/* </ApolloProvider> */}
						</AuthProvider>
					</SessionProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
