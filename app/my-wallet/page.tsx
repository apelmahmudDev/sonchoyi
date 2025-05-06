import { auth } from "@/auth";
import { ChartMan } from "@/components/icon";
import { Card, CardContent } from "@/components/ui/card";

import {
	getMainAccountByUserId,
	getTransactionsByUserId,
	getUserByEmail,
} from "@/database/queries";

import { ObjectId } from "mongodb";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import RecentTransactionsTable from "./_components/RecentTransactionsTable";
import { SpendingFrequencyChart } from "./_components/spending-frequency-chart";
import FormattedAmount from "@/components/ui/formatted-amount";

export interface Transaction {
	id: string;
	userId: ObjectId;
	accountId: ObjectId;
	type: "income" | "expense";
	amount: number;
	category: string;
	description: string;
	date: Date;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}

export default async function MyWallet() {
	const session = await auth();
	const user = await getUserByEmail(session?.user?.email as string);
	const mainAccount = await getMainAccountByUserId(user?.id as string);
	const transactions = await getTransactionsByUserId(user?.id as string);

	return (
		<section className="flex flex-col gap-6">
			{/* greetings and balance */}
			<div className="grid grid-cols-[1fr_469px] gap-6">
				<Card className="h-[310px] bg-welcome bg-cover bg-no-repeat bg-bottom p-3 dark:border border-[#1C252E]">
					<CardContent className="h-full">
						<div className="grid grid-cols-[1fr_260px] gap-5 h-full items-center">
							<div>
								<h1 className="text-2xl font-bold mb-1 text-white">
									Welcome back 👋
								</h1>
								<p className="text-2xl font-bold text-white">{user?.name}</p>
								<p className="mt-3 text-white opacity-65 max-w-sm text-sm font-medium">
									Manage your finances smartly and stay in control of your
									future. Let’s make today productive!
								</p>
							</div>
							<div className="max-w-[260px] ml-auto">
								<ChartMan />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="h-[310px] bg-balance bg-cover bg-no-repeat bg-center dark:border border-[#1C252E]">
					<CardContent className="relative h-full flex flex-col items-center justify-center px-6 py-8">
						<div className="flex flex-col items-center gap-4">
							<h1 className="text-5xl font-extrabold text-white tracking-tight">
								<FormattedAmount amount={mainAccount?.totalBalance}/>
							</h1>

							<p className="text-center text-muted-foreground text-sm max-w-[280px] leading-relaxed">
								Your total balance across all linked accounts and savings plans.
							</p>
						</div>

						<div className="absolute bottom-4 w-full flex justify-center">
							<p className="text-center text-lg font-semibold text-white/80 tracking-wide">
								Available Balance
							</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* income, expense and accounts */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card className="bg-green-50/60 dark:bg-green-500/10 border border-green-200 dark:border-green-400/30">
					<CardContent>
						<div>
							<h2 className="font-semibold text-xs uppercase tracking-wide text-green-700 dark:text-green-300 mb-3">
								Total Income
							</h2>
							<p className="text-4xl font-bold text-green-900 dark:text-green-100">
								<FormattedAmount amount={mainAccount?.totalIncome}/>
							</p>
						</div>
						<div className="flex items-end justify-between mt-5">
							<div className="flex items-center text-green-500 text-sm font-semibold">
								<ArrowUpIcon className="w-4 h-4 mr-1" />
								+8.2%
								<span className="text-muted-foreground ml-1 font-normal">
									this month
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="bg-red-50/60 dark:bg-red-500/10 border border-red-200 dark:border-red-400/30">
					<CardContent>
						<div>
							<h2 className="font-semibold text-xs uppercase tracking-wide text-red-700 dark:text-red-300 mb-3">
								Total Expense
							</h2>
							<p className="text-4xl font-bold text-red-900 dark:text-red-100">
								<FormattedAmount amount={mainAccount?.totalExpense}/>
							</p>
						</div>
						<div className="flex items-end justify-between mt-5">
							<div className="flex items-center text-red-500 text-sm font-semibold">
								<ArrowDownIcon className="w-4 h-4 mr-1" />
								+8.2%
								<span className="text-muted-foreground ml-1 font-normal">
									this month
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent>
						<div>
							<h2 className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-3">
								Active accounts
							</h2>
							<p className="text-4xl font-bold text-foreground">{mainAccount?.linkedAccounts?.length}</p>
						</div>
						<div className="flex items-end justify-between mt-5">
							<div className="flex items-center text-green-500 text-sm font-semibold">
								<ArrowUpIcon className="w-4 h-4 mr-1" />
								+1
								<span className="text-muted-foreground ml-1 font-normal">
									new account
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* transactions and spending chart */}
			<div className="grid grid-cols-[589px_1fr] gap-6">
				<RecentTransactionsTable transactions={transactions} />
				<SpendingFrequencyChart />
			</div>
		</section>
	);
}
