import { cn } from "@/lib/utils";
import { AppLogo } from "../icon";
import { useSidebar } from "./sidebar";

const Logo = () => {
	const { open } = useSidebar();
	return (
		<div className="flex items-center">
			<AppLogo />
			<h1
				className={cn(
					"text-2xl font-bold text-gray-900 ml-2 dark:text-white",
					open ? "block" : "md:hidden"
				)}
			>
				Sonchoyi
			</h1>
		</div>
	);
};

export { Logo };
