import "@/styles/globals.css";
import { fontSans } from "@/config/fonts";
import { Banner } from "@/components/banner";
import { Footer } from "@/components/footer";
import clsx from "clsx";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.variable)} style={{ fontFamily: "Roboto Mono" }}>
				{/* <Banner /> */}

				<main>
					{children}
				</main>

				<Footer />
			</body>
		</html>
	);
}
