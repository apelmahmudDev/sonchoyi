import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import HeroImg from "@/assets/images/background/bg.webp";
import BankImg from "@/assets/images/background/bank.png";
import { Button } from "@/components/ui/button";
import { SuccessIcon } from "@/components/icon";

export default async function Home() {
	const session = await auth();
	if (session?.user) return redirect("/username");

	return (
		<div className="relative h-screen bg-[#76e7f8]">
			<Image
				alt="Banner"
				src={HeroImg}
				placeholder="blur"
				quality={100}
				fill
				sizes="100vw"
				style={{
					objectFit: "initial",
				}}
			/>
			<div className="absolute w-full h-full">
				<div className="h-full container mx-auto px-4 flex flex-col md:flex-row gap-10 justify-between items-center">
					<div className="max-w-xl">
						<p className="mt-10 md:mt-0 text-base mb-3 text-black">
							Smart Money Management
						</p>
						<h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-left uppercase text-black">
							<span className="text-[#00A86B]">Empower Yourself</span> <br />{" "}
							Gain Total Control Over Your Money
						</h1>
						<ul className="mt-5 flex flex-col gap-2">
							<li className="text-left text-black text-sm sm:text-base flex items-start gap-2">
								<SuccessIcon className="w-5 h-5 mt-[3px]" />
								<span>
									Become your own money manager and make every cent count
								</span>
							</li>
							<li className="text-left text-black text-sm sm:text-base flex items-start gap-2">
								<SuccessIcon className="w-5 h-5 mt-[3px]" />
								<span>
									Track your transaction easily, with categories and financial
									report
								</span>
							</li>
							<li className="text-left text-black text-sm sm:text-base flex items-start gap-2">
								<SuccessIcon className="w-5 h-5 mt-[3px]" />
								<span>
									Setup your budget for each category so you in control
								</span>
							</li>
						</ul>
						<Button className="mt-10">Get started</Button>
					</div>
					<div>
						<Image
							src={BankImg}
							width={500}
							height={500}
							alt="Picture of the author"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
