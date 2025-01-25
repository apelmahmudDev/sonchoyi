import Link from "next/link";
import Avatar from "../ui/avatar";
import { Button } from "../ui/button";
import { auth } from "@/auth";

const Navigation = async () => {
	const session = await auth();

	return (
		<nav className="fixed top-5 left-1/2 -translate-x-1/2 z-[999] container h-[64px] bg-white/75 backdrop-blur-sm flex items-center justify-between px-6 rounded-md border">
			<Link href="/">
				<span className="text-lg font-semibold">Fundwave</span>
			</Link>
			<ul className="flex items-center gap-6">
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/username">Account</Link>
				</li>
				<li>
					{session?.user ? (
						<Link href="/profile">
							<div className="flex gap-2 items-center">
								<Avatar source={session?.user?.image as string} />
								<div className="hidden sm:block">
									<p className="text-left text-sm font-semibold text-black">
										{session?.user?.name}
									</p>
									<p className="text-left text-sm text-gray-600 italic">
										{session?.user?.email}
									</p>
								</div>
							</div>
						</Link>
					) : (
						<Link href="/login">
							<Button className="h-10 text-base px-5 rounded-full text-white">
								Sign In
							</Button>
						</Link>
					)}
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
