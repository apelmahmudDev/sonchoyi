import { ArrowLeftIcon } from "@/components/icon";
import CornerLargeBg from "@/assets/images/background/account-r-corner-lg-bg.svg";
import CornerSmallBg from "@/assets/images/background/account-r-corner-sm-bg.svg";
import LeftCornerLgBg from "@/assets/images/background/account-l-corner-lg-bg.svg";
import LeftCornerSmBg from "@/assets/images/background/account-l-corner-sm-bg.svg";
import MiddleBg from "@/assets/images/background/account-middle-bg.svg";
import Image from "next/image";
import Account from "@/components/Account";

export default async function AccountPage() {
	return (
		<div className="p-0">
			<div className="pt-4 pb-8">
				<div className="px-4 flex items-center mb-[60px]">
					<button type="button" className="text-white">
						<ArrowLeftIcon color="#212325" />
					</button>
					<p className="mx-auto text-center text-[#212325] text-lg font-semibold pr-8">
						Account
					</p>
				</div>
				<div className="relative h-[162px]">
					<Image
						className="absolute -top-12 left-4"
						src={LeftCornerSmBg}
						alt="corner-l-sm-bg"
					/>
					<Image
						className="absolute left-0 bottom-0"
						src={LeftCornerLgBg}
						alt="corner-l-lg-bg"
					/>
					<p className="text-center text-[#91919F] text-lg font-semibold mb-2">
						Account Balance
					</p>
					<p className="text-center text-[#161719] text-[40px] font-semibold">
						$9400
					</p>
					<Image
						className="absolute -bottom-10 right-1/2"
						src={MiddleBg}
						alt="corner-r-sm-bg"
					/>
					<Image
						className="absolute bottom-0 right-1/4"
						src={CornerSmallBg}
						alt="corner-r-sm-bg"
					/>
					<Image
						className="absolute right-0 top-0"
						src={CornerLargeBg}
						alt="corner-r-lg-bg"
					/>
				</div>

				<div className="">
					<Account accountName="Wallet" ballance={400} />
					<Account accountName="IBBL" ballance={1000} />
					<Account accountName="Nuha Savings" ballance={2000} />
				</div>
			</div>
		</div>
	);
}
