import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { WalletIcon, DotsVerticalIcon } from "@/components/icon";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { SubAccount } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AccountTable({ accounts }: any) {
	return (
		<div className="relative overflow-x-auto max-h-[450px] md:max-h-[653px] border">
			<Table>
				<TableHeader>
					<TableRow className="bg-muted hover:bg-muted  border-none">
						<TableHead className="w-[300px] p-5">Account Name</TableHead>
						<TableHead className="py-5">Create at</TableHead>
						<TableHead className="py-5">Balance</TableHead>
						<TableHead className="py-5">Account Type</TableHead>
						<TableHead className="py-5">Bank Name</TableHead>
						<TableHead className="text-right py-5"></TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{accounts?.length &&
						accounts.map((account: SubAccount) => (
							<TableRow key={account?.id}>
								<TableCell className="font-medium pl-5 py-4">
									<div className="flex gap-1 items-center">
										<div className="bg-[#F1F1FA] h-[48px] w-[48px] flex flex-shrink-0 justify-center items-center rounded-full">
											<WalletIcon />
										</div>
										<span className="ml-2">{account?.accountName}</span>
									</div>
								</TableCell>
								<TableCell>
									<div className="flex flex-col">
										<span className="text-left">20 Feb 2025</span>
										<span className="mt-1.5 text-left text-xs text-muted-foreground">
											7:14 pm
										</span>
									</div>
								</TableCell>
								<TableCell>${account?.balance}</TableCell>
								<TableCell>{account?.accountType}</TableCell>
								<TableCell>
									{account?.bankName ? account?.bankName : "-"}
								</TableCell>
								<TableCell className="text-right">
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												className="rounded-full text-muted-foreground hover:text-muted-foreground cursor-pointer"
											>
												<DotsVerticalIcon />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-80">
											Place content for the popover here.
										</PopoverContent>
									</Popover>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</div>
	);
}
