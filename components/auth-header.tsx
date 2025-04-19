"use client";

import { cn } from "@/lib/utils";
import { Logo } from "./ui/logo";
import { useEffect, useState } from "react";

export default function AuthHeader() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={cn(
				"fixed top-0 left-auto right-0 w-full shrink-0 bg-none bg-transparent transition-all duration-300 ease-in-out before:absolute before:content-[''] before:w-full before:h-full before:top-0 before:left-0 z-10 before:-z-[1] before:transition-all before:duration-300 before:ease-in-out",
				{
					"fixed before-bg-dashboard-header before:backdrop-blur-[6px]":
						isScrolled,
				}
			)}
		>
			<nav className="h-[72px] flex items-center justify-between px-4 md:px-6">
				<div>
					<Logo />
				</div>
				<div className="flex items-center gap-2"></div>
			</nav>
		</header>
	);
}
