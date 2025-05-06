import Link from "next/link";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { DefaultIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { typeIconMap } from "@/constants/type-icon-map";
import { Card, CardContent } from "@/components/ui/card";
import { format, isToday, isYesterday, formatDistanceToNow } from "date-fns";
import { Transaction } from "../page";
import FormattedAmount from "@/components/ui/formatted-amount";

export default function RecentTransactionsTable({
	transactions,
}: {
	transactions: Transaction[];
}) {
	return (
		<Card className="pt-6 pb-4">
			<CardContent className="px-0">
				<h3 className="ms-6 mb-4 text-lg font-semibold">Recent Transaction</h3>
				<div className="relative overflow-x-auto max-h-[350]">
					<Table>
						<TableHeader>
							<TableRow className="bg-muted text-muted-foreground">
								<TableHead className="max-w-[320px] min-w-[300px] w-full px-6 py-4 text-sm font-semibold">
									Transaction
								</TableHead>
								<TableHead className="min-w-[130px] px-6 py-4 text-sm font-semibold">
									Time
								</TableHead>
								<TableHead className="min-w-[120px] px-6 py-4 text-sm font-semibold text-right">
									Amount
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{transactions?.length &&
								transactions.slice(0, 4).map((transaction) => {
									const category = transaction?.category;
									const iconData = typeIconMap[category as keyof typeof typeIconMap] || {};
									const Icon = iconData.icon || DefaultIcon;
									const bgColor = iconData.bg || "var(--default-bg)";

									return (
										<TableRow
											key={transaction?.id}
											className="hover:bg-muted transition-colors"
										>
											<TableCell className="max-w-[320px] min-w-[300px] w-full px-6 py-4">
												<div className="flex items-start gap-3">
													<div
														style={{ backgroundColor: bgColor }}
														className="shrink-0 text-accent-foreground h-10 w-10 flex items-center justify-center rounded-full shadow-sm"
													>
														<Icon />
													</div>
													<div className="flex flex-col gap-1">
														<span className="text-sm font-medium text-foreground">
															{transaction?.category}
														</span>
														<span className="text-xs text-muted-foreground whitespace-normal break-words">
															{transaction?.description}
														</span>
													</div>
												</div>
											</TableCell>
											<TableCell className="min-w-[130px] px-6 py-4">
												<span className="text-sm text-muted-foreground">
													{isToday(new Date(transaction.createdAt))
														? formatDistanceToNow(
																new Date(transaction.createdAt),
																{ addSuffix: true }
														  )
														: isYesterday(new Date(transaction.createdAt))
														? "Yesterday"
														: format(
																new Date(transaction.createdAt),
																"dd MMM yyyy"
														  )}
												</span>
											</TableCell>
											<TableCell className="min-w-[120px] px-6 py-4 text-right">
												<p
													className={`font-semibold text-sm ${
														transaction?.type === "expense"
															? "text-destructive"
															: "text-green-400"
													}`}
												>
													
													{transaction?.type === "expense"
														? <FormattedAmount prefix="- " amount={transaction?.amount}/>
														: <FormattedAmount prefix="+ " amount={transaction?.amount}/>
													}
												</p>
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</div>
				<div className="border-t border-dashed">
					<Link
						href="/transaction"
						className="w-full flex justify-end pr-3 pt-2"
					>
						<Button
							variant="ghost"
							size="sm"
							className="text-primary font-medium hover:bg-transparent hover:text-accent-foreground dark:hover:text-white transition-colors duration-200 rounded-xl"
						>
							View all
							<ArrowRightIcon className="w-4 h-4" />
						</Button>
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
