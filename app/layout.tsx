import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/lib/providers/providers";
import { connectToDatabase } from "@/service/mongo";

// primary font
const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Sonchoyi",
	description: "Manage your finances smarter, faster, better.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Ensure database connection
	await connectToDatabase();
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<SessionProvider>
					<Providers>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
							enableColorScheme
						>
							{children}
							<Toaster position="top-center" />
						</ThemeProvider>
					</Providers>
				</SessionProvider>
			</body>
		</html>
	);
}
