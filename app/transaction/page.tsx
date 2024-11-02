import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import BottomNavigation from "@/components/common/BottomNavigation";
import {
	ArrowRightIcon,
	ShoppingBagIcon,
	ThreeLineIcon,
} from "@/components/icon";
import TransactionItem from "@/components/TransactionItem";

export default function TransactionPage() {
	return (
		<div className="p-4">
			<div>
				{/* select field of month */}
				<div className="flex items-center justify-between">
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
					<button className="flex items-center justify-center h-10 w-10 rounded-lg border border-[#F1F1FA]">
						<ThreeLineIcon />
					</button>
				</div>
				<button className="my-5 h-[48px] flex items-center justify-between w-full bg-[#EEE5FF] text-[#7F3DFF] rounded-lg py-[14px] px-4">
					<span>See your financial report</span>
					<ArrowRightIcon />
				</button>

				{/* transaction list */}
				<div className="flex flex-col gap-4">
					<div>
						<h4 className="text-[#0D0E0F] text-lg font-semibold">Today</h4>
						<div className="flex flex-col gap-2">
							<TransactionItem
								icon={<ShoppingBagIcon />}
								title="Shopping"
								description="Buy some grocery"
								amount={-120}
								created="10:00 AM"
							/>
							<TransactionItem
								icon={<ShoppingBagIcon />}
								title="Shopping"
								description="Buy some grocery"
								amount={-120}
								created="10:00 AM"
							/>
							<TransactionItem
								icon={<ShoppingBagIcon />}
								title="Shopping"
								description="Buy some grocery"
								amount={120}
								created="10:00 AM"
							/>
						</div>
					</div>
					<div>
						<h4 className="text-[#0D0E0F] text-lg font-semibold">Yesterday</h4>
						<div className="flex flex-col gap-2">
							<TransactionItem
								icon={<ShoppingBagIcon />}
								title="Shopping"
								description="Buy some grocery"
								amount={-120}
								created="10:00 AM"
							/>
							<TransactionItem
								icon={<ShoppingBagIcon />}
								title="Shopping"
								description="Buy some grocery"
								amount={-120}
								created="10:00 AM"
							/>
							<TransactionItem
								icon={<ShoppingBagIcon />}
								title="Shopping"
								description="Buy some grocery"
								amount={-120}
								created="10:00 AM"
							/>
						</div>
					</div>
				</div>
			</div>
			<BottomNavigation />
		</div>
	);
}
