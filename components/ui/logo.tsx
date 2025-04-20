import Link from "next/link";
import { AppLogo } from "../icon";

const Logo = () => {
	return (
		<Link href="/">
			<div className="flex items-center">
				<AppLogo className="shrink-0" />
				<h1 className="text-2xl font-bold text-gray-900 ml-2 dark:text-white">
					Sonchoyi
				</h1>
			</div>
		</Link>
	);
};

export { Logo };
