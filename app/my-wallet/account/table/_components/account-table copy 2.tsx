import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { WalletIcon, DotsVerticalIcon } from "@/components/icon";
import { SubAccount } from "@/types";
import { format } from "date-fns";

interface Props {
	accounts: SubAccount[];
}

export default function AccountTable({ accounts }: Props) {
	return (
		<div className="border rounded-2xl shadow-sm bg-background overflow-hidden">
			<div className="max-h-[500px] overflow-y-auto">
				<table className="w-full table-auto">
					<thead className="sticky top-0 z-20 bg-background shadow-sm">
						<tr>
							<th className="text-left w-[280px] px-6 py-4">Account Name</th>
							<th className="text-left px-4 py-4">Created At</th>
							<th className="text-left px-4 py-4">Balance</th>
							<th className="text-left px-4 py-4">Account Type</th>
							<th className="text-left px-4 py-4">Bank Name</th>
							<th className="text-right px-4 py-4"></th>
						</tr>
					</thead>
					<tbody>
						{accounts?.length > 0 ? (
							accounts.map((account) => (
								<tr key={account._id} className="hover:bg-muted transition">
									<td className="px-6 py-4">
										<div className="flex items-center gap-3">
											<div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
												<WalletIcon className="h-5 w-5 text-foreground" />
											</div>
											<span className="font-medium">{account.accountName}</span>
										</div>
									</td>
									<td className="px-4 py-4 text-sm">
										<div className="flex flex-col">
											<span>
												{format(new Date(account.createdAt), "dd MMM yyyy")}
											</span>
											<span className="text-xs text-muted-foreground">
												{format(new Date(account.createdAt), "p")}
											</span>
										</div>
									</td>
									<td className="px-4 py-4 font-semibold">
										${account.balance.toLocaleString()}
									</td>
									<td className="px-4 py-4 capitalize">
										{account.accountType}
									</td>
									<td className="px-4 py-4">{account.bankName || "-"}</td>
									<td className="px-4 py-4 text-right">
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="ghost"
													size="icon"
													className="rounded-full text-muted-foreground hover:text-foreground"
												>
													<DotsVerticalIcon />
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-48">
												<p className="text-sm text-muted-foreground">
													Actions coming soon...
												</p>
											</PopoverContent>
										</Popover>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={6}
									className="text-center py-6 text-muted-foreground"
								>
									No accounts found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
