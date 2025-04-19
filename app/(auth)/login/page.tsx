import Link from "next/link";
import Image from "next/image";
import ManImg from "@/assets/images/man.png";
import AuthHeader from "@/components/auth-header";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
	return (
		<section className="font-[family-name:var(--font-inter)] flex flex-col h-full min-h-screen">
			<AuthHeader />
			<div className="flex-1 flex">
				<div className="hidden lg:flex items-center justify-center max-w-[480px] w-full auth-bg bg-[#fdfbfa] px-6 pb-6 py-[72px]">
					<div>
						<h2 className="font-bold text-2xl xl:text-3xl text-center">
							Hi, Welcome back
						</h2>
						<p className="mt-4 text-[#637381] text-base text-center">
							Manage your finances smarter, faster, better.
						</p>
						<div className="flex flex-col justify-center items-center">
							<Image className="w-[250px]" src={ManImg} alt="man" />
						</div>
					</div>
				</div>
				<div className="flex justify-center items-start lg:items-center px-4 py-[80px] lg:py-[72px] w-full">
					<div className="flex-shrink-0 max-w-[450px] w-full">
						<div className="mb-10">
							<h2 className="text-center lg:text-left text-lg font-bold mb-2.5">
								Sign in to your account
							</h2>
							<p className="text-center lg:text-left text-sm text-[#637381]">
								Don’t have an account?{" "}
								<Link href="/signup">
									<button className="text-[#00A76F] font-semibold text-sm cursor-pointer hover:underline">
										Get started
									</button>
								</Link>
							</p>
						</div>
						<LoginForm />
					</div>
				</div>
			</div>
		</section>
	);
}
