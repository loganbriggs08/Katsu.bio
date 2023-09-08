import "@/styles/globals.css";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Banner } from "@/components/banner";
import clsx from "clsx";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.variable)} style={{ fontFamily: "Rubik" }}>
				{/* <Banner /> */}

				<main>
					{children}
				</main>
			</body>
		</html>
	);
}
