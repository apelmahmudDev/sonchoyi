import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Account from "@/components/Account";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@/components/icon";
import MiddleBg from "@/assets/images/background/account-middle-bg.svg";
import CornerLargeBg from "@/assets/images/background/account-r-corner-lg-bg.svg";
import CornerSmallBg from "@/assets/images/background/account-r-corner-sm-bg.svg";
import LeftCornerLgBg from "@/assets/images/background/account-l-corner-lg-bg.svg";
import LeftCornerSmBg from "@/assets/images/background/account-l-corner-sm-bg.svg";
import {
	getMainAccountByUserId,
	getSubAccountsByUserId,
	getUserByEmail,
} from "@/database/queries";

export default async function AccountPage() {
	const session = await auth();
	if (!session) {
		redirect("/login");
	}

	const user = await getUserByEmail(session?.user?.email as string);
	const subAccounts = await getSubAccountsByUserId(user?.id as string);
	const mainAccount = await getMainAccountByUserId(user?.id as string);

	return (
		<div className="h-screen p-0">
			<div className="h-full border flex flex-col pt-4 pb-8">
				<div className="px-4 flex items-center mb-[60px]">
					<Link href="/username">
						<button type="button" className="text-white">
							<ArrowLeftIcon color="#212325" />
						</button>
					</Link>
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
						${mainAccount?.totalBalance || 0}
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
					{subAccounts.map((acc) => (
						<Account
							key={acc?.id}
							accountName={acc?.accountName}
							balance={acc?.balance}
						/>
					))}
					{/* no account message */}
					{subAccounts?.length === 0 && (
						<div className="px-4">
							<p className="mb-3 text-center text-[#91919F] font-semibold font-base">
								No Accounts Found!
							</p>
							<p className="max-w-sm mx-auto text-center text-[#91919F]">
								Create your first account to view your balance and manage your
								finances. Click “Add Account” to get started! 🚀
							</p>
						</div>
					)}
				</div>

				<div className="mt-auto mx-auto rounded-2xl">
					<Link href="/account/add">
						<Button>Add account</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
