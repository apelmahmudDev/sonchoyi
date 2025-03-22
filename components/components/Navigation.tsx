import Link from "next/link";
import { Button } from "./ui/button";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navigation = async () => {
	const session = await auth();

	return (
		<nav className="fixed top-5 left-1/2 -translate-x-1/2 z-[999] max-w-7xl w-full h-[64px] bg-white/75 backdrop-blur-sm flex items-center justify-between px-6 rounded-md border">
			<Link href="/">
				<span className="text-lg font-semibold">Fundwave</span>
			</Link>
			<ul className="flex items-center gap-6">
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/my-wallet">Account</Link>
				</li>
				<li>
					{session?.user ? (
						<Link href="/profile">
							<div className="flex gap-2 items-center">
								<Avatar className="hover:scale-[1.05] transition duration-300 ease-in-out size-[40px] border-1 border-primary/65 hover:border-primary/100 rounded-full p-0.5">
									<AvatarImage
										className="rounded-full"
										src="https://github.com/shadcn.png"
									/>
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
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
