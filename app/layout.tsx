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
			<body style={{ display: "flex", flexDirection: "column", minHeight: "98vh", fontFamily: "Roboto Mono" }}>
				{/* <Banner /> */}

				<main style={{ flex: "1" }}>
					{children}
				</main>
				
				<Footer />
			</body>
		</html>
	);
}
