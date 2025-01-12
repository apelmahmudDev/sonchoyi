import type { Metadata } from "next";
import "./globals.css";
import { connectToDatabase } from "@/service/mongo";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Fundwave",
	description: "Fundwave is a personal finance app.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	await connectToDatabase();
	return (
		<html lang="en">
			<body className={`${inter.className} light`}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
