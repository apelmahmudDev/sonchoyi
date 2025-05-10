"use client";

import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
	const { theme, setTheme } = useTheme();
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
				isScrolled
					? "backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border-b border-gray-200 dark:border-gray-700"
					: "bg-transparent"
			}`}
		>
			<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
				{/* Logo */}
				<div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
					Sonchoyi
				</div>

				{/* Desktop Nav */}
				<nav className="hidden md:flex items-center gap-8 text-gray-700 dark:text-gray-200 font-medium">
					<Link
						href="/my-wallet"
						className="hover:text-indigo-500 transition-colors"
					>
						My wallet
					</Link>
					<a
						href="#pricing"
						className="hover:text-indigo-500 transition-colors"
					>
						Pricing
					</a>
					<a
						href="#contact"
						className="hover:text-indigo-500 transition-colors"
					>
						Contact
					</a>
				</nav>

				{/* Right Actions */}
				<div className="hidden md:flex items-center gap-4">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
					>
						{theme === "dark" ? (
							<Sun className="h-5 w-5" />
						) : (
							<Moon className="h-5 w-5" />
						)}
					</Button>
					<Link href="/login">
						<Button
							variant="outline"
							size="sm"
							className="border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-slate-700"
						>
							Login
						</Button>
					</Link>
					<Button
						size="sm"
						className="bg-indigo-600 hover:bg-indigo-700 text-white"
					>
						Get Started
					</Button>
				</div>

				{/* Mobile Toggle */}
				<div className="md:hidden flex items-center gap-2">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
					>
						{theme === "dark" ? (
							<Sun className="w-5 h-5" />
						) : (
							<Moon className="w-5 h-5" />
						)}
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? (
							<X className="w-6 h-6" />
						) : (
							<Menu className="w-6 h-6" />
						)}
					</Button>
				</div>
			</div>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -20, opacity: 0 }}
						transition={{ duration: 0.25 }}
						className="md:hidden px-6 pb-6 bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-md"
					>
						<nav className="flex flex-col gap-4 mt-4 text-gray-800 dark:text-gray-100 font-medium">
							<a href="#features" className="hover:text-indigo-500">
								Features
							</a>
							<a href="#pricing" className="hover:text-indigo-500">
								Pricing
							</a>
							<a href="#contact" className="hover:text-indigo-500">
								Contact
							</a>
							<div className="flex gap-3 mt-4">
								<Button
									variant="outline"
									className="w-full border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300"
								>
									Login
								</Button>
								<Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
									Get Started
								</Button>
							</div>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
