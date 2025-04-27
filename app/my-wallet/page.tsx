import Link from "next/link";
import { auth } from "@/auth";
import WaveChart from "./_components/WaveChart";
import TransactionItem from "@/components/TransactionItem";
import { ShoppingBagIcon, ChartMan } from "@/components/icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	getMainAccountByUserId,
	getTransactionsByUserId,
	getUserByEmail,
} from "@/database/queries";

import { ObjectId } from "mongodb";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

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
		<div>
			<div className="grid grid-cols-[1fr_469px] gap-6">
				<Card className="h-[310px] bg-welcome bg-cover bg-no-repeat bg-bottom p-3 dark:border border-[#1C252E]">
					<CardContent className="h-full">
						<div className="grid grid-cols-[1fr_260px] gap-5 h-full items-center">
							<div>
								<h1 className="text-2xl font-bold mb-1 text-white">
									Welcome back 👋
								</h1>
								<p className="text-2xl font-bold text-white">Apel Mahmud</p>
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
								৳ {mainAccount?.totalBalance ?? "0.00"}
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

			{/* <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card>
					<CardContent>
						<div>
							<h2 className="text-sm font-semibold text-muted-foreground mb-3">
								Total Income
							</h2>
							<p className="text-4xl font-bold text-foreground">৳ 25,600</p>
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
				<Card>
					<CardContent>
						<div>
							<h2 className="text-sm font-semibold text-muted-foreground mb-3">
								Total Expense
							</h2>
							<p className="text-4xl font-bold text-foreground">৳ 25,600</p>
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
							<h2 className="text-sm font-semibold text-muted-foreground mb-3">
								Active accounts
							</h2>
							<p className="text-4xl font-bold text-foreground">3</p>
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
			</div> */}
			<div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card className="bg-green-50/60 dark:bg-green-500/10 border border-green-200 dark:border-green-400/30">
					<CardContent>
						<div>
							<h2 className="font-semibold text-xs uppercase tracking-wide text-green-700 dark:text-green-300 mb-3">
								Total Income
							</h2>
							<p className="text-4xl font-bold text-green-900 dark:text-green-100">
								৳ 25,600
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
								৳ 25,600
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
							<p className="text-4xl font-bold text-foreground">3</p>
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
			<div className="mt-[23px] grid grid-cols-2 gap-6">
				{/* Spend Frequency */}
				<Card>
					<CardHeader>
						<CardTitle>Spend Frequency</CardTitle>
					</CardHeader>
					<CardContent>
						<WaveChart />
					</CardContent>
				</Card>

				<Card>
					{/* recenter transaction */}
					<CardHeader className="flex-row items-center justify-between">
						<CardTitle>Recent Transaction</CardTitle>
						<Link href="/transaction">
							<button className="bg-violet-20 px-6 py-2 font-medium text-sm text-violet-100 rounded-3xl cursor-pointer">
								Sell all
							</button>
						</Link>
					</CardHeader>

					{/* transaction list */}
					<CardContent className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
						{transactions?.map((transaction: Transaction) => (
							<TransactionItem
								key={transaction?.id}
								icon={<ShoppingBagIcon />}
								title={transaction?.category}
								type={transaction?.type}
								description={transaction?.description}
								amount={transaction?.amount}
								created={new Date(transaction?.date).toLocaleTimeString()}
							/>
						))}
						{/* no transaction message */}
						{transactions?.length === 0 && (
							<div className="my-10 text-center text-[#91919F]">
								Currently you don&apos;t have any transaction!
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
