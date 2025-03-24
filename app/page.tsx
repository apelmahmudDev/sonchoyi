import { doSignOut } from "./actions";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import BankImg from "@/assets/images/background/bank.png";
import HeroImg from "@/assets/images/background/bg.webp";
import MyAccountImg from "@/assets/images/account-presentation.png";
import { LogoutIcon, SuccessIcon } from "@/components/icon";

export default async function Home() {

	return (
		<>
			<header>
				<Navigation />
			</header>
			<main>
				<section className="relative h-screen bg-[#76e7f8]">
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
						<div className="h-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-10 justify-between items-center">
							<div className="max-w-xl">
								<form action={doSignOut}>
									<button
										type="submit"
										className="rounded-2xl flex items-center gap-2.5 cursor-pointer"
									>
										<div className="flex items-center justify-center h-[52px] w-[52px] bg-[#EEE5FF] rounded-2xl">
											<LogoutIcon />
										</div>
										<p className="text-base font-medium text-[#292B2D]">
											Logout
										</p>
									</button>
								</form>
								<p className="mt-[130px] md:mt-0 text-base mb-3 text-black">
									Smart Money Management
								</p>
								<h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-left uppercase text-black">
									<span className="text-[#00A86B]">Empower Yourself</span>{" "}
									<br /> Gain Total Control Over Your Money
								</h1>
								<ul className="mt-5 flex flex-col gap-2">
									<li className="text-left text-black text-sm sm:text-base flex items-start gap-2">
										<SuccessIcon className="w-4 h-4 mt-[3.5px]" />
										<span>
											Become your own money manager and make every cent count
										</span>
									</li>
									<li className="text-left text-black text-sm sm:text-base flex items-start gap-2">
										<SuccessIcon className="w-4 h-4 mt-[3.5px]" />
										<span>
											Track your transaction easily, with categories and
											financial report
										</span>
									</li>
									<li className="text-left text-black text-sm sm:text-base flex items-start gap-2">
										<SuccessIcon className="w-4 h-4 mt-[3.5px]" />
										<span>
											Setup your budget for each category so you in control
										</span>
									</li>
								</ul>
								<Link href="/login">
									<Button className="mt-10">Get started</Button>
								</Link>
							</div>
							<div>
								<Image src={BankImg} width={500} height={500} alt="Bank" />
							</div>
						</div>
					</div>
				</section>
				{/* key benefits */}
				<section className="bg-white mt-[200px] sm:mt-[300px] md:mt-0 py-20">
					<div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-20">
						<div className="relative lg:max-w-lg w-full bg-accent h-auto rounded-lg px-10 py-3 order-last lg:order-first">
							<div className="shadow-md rounded-lg overflow-hidden border border-gray-200">
								<Image src={MyAccountImg} alt="Bank" />
							</div>
						</div>
						<div>
							<h2 className="text-left text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#00A86B]">
								Discover key benefits to manage and grow your finances.
							</h2>
							<p className="text-left text-base text-gray-600 py-5">
								Maximize savings, track expenses, and stay in control.
							</p>
							<div className="mt-3 flex flex-col gap-8">
								{/* Effortless Expense Tracking */}
								<section>
									<div className="flex items-center gap-3">
										<SuccessIcon className="w-5 h-5" aria-hidden="true" />
										<h3 className="text-left text-black text-lg font-semibold">
											Effortless Expense Tracking
										</h3>
									</div>
									<p className="mt-2 ml-8 text-left text-gray-600">
										Keep track of your daily expenses in one place. Get
										real-time updates and insights to stay organized, avoid
										overspending, and make informed financial decisions.
									</p>
								</section>

								{/* Smart Budget Planning */}
								<section>
									<div className="flex items-center gap-3">
										<SuccessIcon className="w-5 h-5" aria-hidden="true" />
										<h3 className="text-left text-black text-lg font-semibold">
											Smart Budget Planning
										</h3>
									</div>
									<p className="mt-2 ml-8 text-left text-gray-600">
										Set personalized budgets for your goals. Track spending
										habits, get alerts when nearing limits, and adjust to stay
										on track.
									</p>
								</section>

								{/* Seamless Financial Insights */}
								<section>
									<div className="flex items-center gap-3">
										<SuccessIcon className="w-5 h-5" aria-hidden="true" />
										<h3 className="text-left text-black text-lg font-semibold">
											Seamless Financial Insights
										</h3>
									</div>
									<p className="mt-2 ml-8 text-left text-gray-600">
										Visualize spending patterns with interactive charts and
										reports. Identify areas to cut costs, analyze trends, and
										gain control over your financial future.
									</p>
								</section>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
