import Link from "next/link";
import Image from "next/image";
import ManImg from "@/assets/images/man.png";
import { SignupForm } from "./_components/signup-form";

export default function SignUpPage() {
	return (
		<div className="h-screen">
			<div className="h-full container mx-auto px-4">
				<Link href="/">
					<span className="text-lg font-semibold">Fundwave</span>
				</Link>
				<div className="h-full flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-[100px]">
					<div className="relative lg:max-w-[629px] w-full">
						<h1 className="mt-10 lg:mt-0 font-semibold text-[26px] md:text-[42px] xl:text-[50px]">
							Sign Up to
						</h1>
						<h2 className="font-medium text-lg md:text-2xl xl:text-[35px]">
							Manage your money
						</h2>
						<p className="mt-8 lg:mt-[43px] mb-1.5 z-10 text-sm md:text-base">
							If you already have an account
						</p>
						<p className="text-sm md:text-base">
							You can{" "}
							<Link href="/login">
								<button className="text-primary font-semibold text-sm md:text-base">
									Login here !
								</button>
							</Link>
						</p>
						<Image
							className="hidden lg:flex w-[300px] absolute mt-28 xl:mt-20 right-0 top-0 bottom-0 -z-10"
							src={ManImg}
							alt="man"
						/>
					</div>
					<SignupForm />
				</div>
			</div>
		</div>
	);
}
