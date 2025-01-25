import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	ShoppingBagIcon,
	NotificationIcons,
	ExpenseIcon,
	IncomeIcon,
} from "@/components/icon";
import BottomNavigation from "@/components/common/BottomNavigation";
import Avatar from "@/components/ui/avatar";
import Link from "next/link";
// import ShoppingBagIcon from "@/components/icon/ShoppingBagIcon";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import WaveChart from "@/components/WaveChart";
import {
	getMainAccountByUserId,
	getTransactionsByUserId,
	getUserByEmail,
} from "@/database/queries";
import TransactionItem from "@/components/TransactionItem";

export default async function YourAccountPage() {
	const session = await auth();
	if (!session) {
		redirect("/login");
	}

	const user = await getUserByEmail(session?.user?.email as string);
	const mainAccount = await getMainAccountByUserId(user?.id as string);
	const transactions = await getTransactionsByUserId(user?.id as string);

	return (
		<>
			<div className="p-4">
				{/* heading */}
				<div className="flex justify-between items-center mb-6">
					{/* avatar / user image */}
					<Link href="/profile">
						<Avatar source={session?.user?.image as string} />
					</Link>
					{/* select field of month */}
					<div className="flex-shrink-0 text-center">
						<Select>
							<SelectTrigger className="w-[115px] rounded-[40px] font-medium border-[#F1F1FA]">
								<SelectValue placeholder="Month" />
							</SelectTrigger>
							<SelectContent className="h-[200px]">
								<SelectGroup>
									<SelectItem value="january">January</SelectItem>
									<SelectItem value="february">February</SelectItem>
									<SelectItem value="march">March</SelectItem>
									<SelectItem value="april">April</SelectItem>
									<SelectItem value="may">May</SelectItem>
									<SelectItem value="june">June</SelectItem>
									<SelectItem value="july">July</SelectItem>
									<SelectItem value="august">August</SelectItem>
									<SelectItem value="september">September</SelectItem>
									<SelectItem value="october">October</SelectItem>
									<SelectItem value="november">November</SelectItem>
									<SelectItem value="december">December</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					{/* notification */}
					<button className="border-none w-fit h-fit">
						<NotificationIcons />
					</button>
				</div>
				{/* account balance */}
				<div className="text-center mb-[27px]">
					<p className="text-[#91919F] text-lg font-medium">Account balance</p>
					<p className="text-[#161719] text-[40px] font-semibold">
						${mainAccount?.totalBalance || 0}
					</p>
				</div>
				{/* income/expense */}
				<div className="flex justify-between gap-4">
					{/* income */}
					<div className="flex items-center bg-[#00A86B] h-[80px] rounded-3xl px-4 py-[17px] w-full">
						<div className="flex items-center justify-center h-[48px] w-[48px] bg-[#FCFCFC] rounded-2xl mr-2.5 text-[#00A86B]">
							<IncomeIcon />
						</div>
						<div>
							<p className="font-medium text-sm text-[#FCFCFC]">Income</p>
							<p className="text-[#FCFCFC] text-[22px] font-semibold">
								${mainAccount?.totalIncome || 0}
							</p>
						</div>
					</div>

					{/* Expenses */}
					<div className="flex items-center bg-[#FD3C4A] h-[80px] rounded-3xl px-4 py-[17px] w-full">
						<div className="flex items-center justify-center h-[48px] w-[48px] bg-[#FCFCFC] rounded-2xl mr-2.5 text-[#FD3C4A]">
							<ExpenseIcon />
						</div>
						<div>
							<p className="font-medium text-sm text-[#FCFCFC]">Expenses</p>
							<p className="text-[#FCFCFC] text-[22px] font-semibold">
								${mainAccount?.totalExpense || 0}
							</p>
						</div>
					</div>
				</div>
				{/* Spend Frequency */}
				<div className="mt-[23px]">
					<p className="font-semibold text-lg text-[#0D0E0F]">
						Spend Frequency
					</p>
					<WaveChart />
					{/* recenter transaction */}
					<div className="mt-4 flex items-center justify-between">
						<p className="font-semibold text-lg text-[#292B2D]">
							Recent Transaction
						</p>
						<Link href="/transaction">
							<button className="bg-[#EEE5FF] px-6 py-2 font-medium text-sm text-[#7F3DFF] rounded-3xl">
								Sell all
							</button>
						</Link>
					</div>

					{/* transaction list */}
					<div className="mt-4 flex flex-col gap-2 max-h-[300px] overflow-y-auto">
						{transactions?.map((transaction) => (
							<TransactionItem
								key={transaction?.id}
								icon={<ShoppingBagIcon />}
								title={transaction?.category}
								type={transaction?.type}
								description={transaction?.description}
								amount={transaction?.amount}
								created={new Date(
									transaction?.date as string
								).toLocaleTimeString()}
							/>
						))}
						{/* no transaction message */}
						{transactions?.length === 0 && (
							<div className="my-10 text-center text-[#91919F]">
								Currently you don&apos;t have any transaction!
							</div>
						)}
					</div>
				</div>
			</div>

			<BottomNavigation />
		</>
	);
}
