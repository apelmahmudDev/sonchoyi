import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { WalletIcon } from "@/components/icon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TransactionDashboardTable({ transactions }: any) {
	return (
		<div className="relative overflow-x-auto border border-border rounded-2xl shadow-sm">
			<Table>
				<TableHeader>
					<TableRow className="bg-muted text-muted-foreground">
						<TableHead className="max-w-[320px] min-w-[300px] w-full px-6 py-4 text-sm font-semibold">
							Transaction
						</TableHead>
						<TableHead className="min-w-[120px] px-6 py-4 text-sm font-semibold text-right">
							Amount
						</TableHead>
						<TableHead className="min-w-[130px] px-6 py-4 text-sm font-semibold">
							Time
						</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{transactions?.length &&
						transactions.map((transaction) => (
							<TableRow
								key={transaction?.id}
								className="hover:bg-muted transition-colors"
							>
								<TableCell className="max-w-[320px] min-w-[300px] w-full px-6 py-4">
									<div className="flex items-start gap-3">
										<div className="shrink-0 bg-accent text-accent-foreground h-10 w-10 flex items-center justify-center rounded-full shadow-sm">
											<WalletIcon />
										</div>
										<div className="flex flex-col gap-1">
											<span className="text-sm font-medium text-foreground">
												Shopping
											</span>
											<span className="text-xs text-muted-foreground whitespace-normal break-words">
												This will allow any long string in the
											</span>
										</div>
									</div>
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
											? `- $${transaction?.amount}`
											: `+ $${transaction?.amount}`}
									</p>
								</TableCell>

								<TableCell className="min-w-[130px] px-6 py-4">
									<div className="flex flex-col">
										<span className="text-sm text-foreground">20 Feb 2025</span>
										<span className="text-xs mt-1 text-muted-foreground">
											7:14 PM
										</span>
									</div>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</div>
	);
}
