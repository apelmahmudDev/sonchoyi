// Note : Bottom Navigation component just used for small device but in large device we will use sidebar navigation / top navigation

import React from "react";
import {
	CurrencyExchangeIcon,
	ExpenseIcon,
	IncomeIcon,
	PlusIcon,
	PieChartIcon,
	TransactionIcon,
	UserIcon,
	HomeIcon,
} from "../icon";
import Link from "next/link";

const BottomNavigation = () => {
	return (
		<>
			<div className="h-[79px] w-full"></div>
			<div className="d w-full fixed bottom-0 h-[79px] bg-[#FCFCFC] rounded-t-2xl px-4">
				<div className="flex justify-around items-center h-full">
					<Link href="/account">
						<div className="flex flex-col items-center">
							<HomeIcon />
							<p className="mt-1 text-sm text-[#7F3DFF] font-medium">Home</p>
						</div>
					</Link>
					<div className="flex flex-col items-center">
						<TransactionIcon />
						<p className="mt-1 text-sm text-[#C6C6C6] font-medium">
							Transaction
						</p>
					</div>
					<div className="relative bg-white bottom-5 p-2 rounded-full">
						<button className="flex-shrink-0 bg-[#7F3DFF] h-[50px] w-[50px] flex items-center justify-center rounded-full shadow-sm group/options">
							<div className="group-hover/options:rotate-45 transition">
								<PlusIcon className="flex-shrink-0" />
							</div>
							{/* start more options */}
							<div className="invisible group-hover/options:visible absolute bottom-[55px] pb-3 flex-shrink-0 w-[170px] flex flex-col items-center transition-all">
								<div className="h-[50px] w-[50px] bg-[#0077FF] rounded-full flex items-center justify-center text-white">
									<CurrencyExchangeIcon />
								</div>
								<div className="mt-3 flex justify-between w-full">
									<Link href="/income">
										<div className="h-[50px] w-[50px] bg-[#00A86B] rounded-full flex items-center justify-center text-white">
											<IncomeIcon />
										</div>
									</Link>
									<Link href="/expense">
										<div className="h-[50px] w-[50px] bg-[#FD3C4A] rounded-full flex items-center justify-center text-white">
											<ExpenseIcon />
										</div>
									</Link>
								</div>
							</div>
							{/* end more options */}
						</button>
					</div>
					<div className="flex flex-col items-center">
						<PieChartIcon />
						<p className="mt-1 text-sm text-[#C6C6C6] font-medium">Budget</p>
					</div>
					<Link href="/profile">
						<div className="flex flex-col items-center">
							<UserIcon />
							<p className="mt-1 text-sm text-[#C6C6C6] font-medium">Profile</p>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
};

export default BottomNavigation;
