"use client";
import { useState } from "react";
import AvatarImg from "@/assets/images/avatar.jpg";
import Image from "next/image";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { NotificationIcon } from "@/components/icon/Notifications";
import { ExpenseIcon } from "@/components/icon/ExpenseIcon";
import { IncomeIcon } from "@/components/icon/IncomeIcon";

const Chart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { ShoppingBagIcon } from "@/components/icon/ShoppingBagIcon";

// chart options
const options: ApexOptions = {
	chart: {
		// height: 350,
		type: "area",
		toolbar: {
			show: false,
		},
		foreColor: "rgba(0 0 0 / 50%)",
		zoom: {
			enabled: false,
		},
	},
	grid: {
		show: false,
		borderColor: "#F4F4F4",
	},
	fill: {
		type: "gradient",
		// opacity: 0.5,
		// type: "solid",
		gradient: {
			// shadeIntensity: 1,
			// opacityFrom: 0,
			// opacityTo: 0.9,
			colorStops: [
				{
					offset: 20,
					color: "#7F3DFF",
					opacity: 0.6,
				},
				{
					offset: 80,
					color: "#7F3DFF",
					opacity: 0.1,
				},
			],
		},
	},
	colors: ["#7F3DFF"],
	dataLabels: {
		enabled: false,
	},
	stroke: {
		curve: "smooth",
		show: true,
	},
	tooltip: {
		x: {
			format: "dd/MM/yy HH:mm",
		},
	},
	xaxis: {
		labels: {
			show: false,
		},
		categories: ["Jan", "Feb", "Mar", "Apr", "May"],
	},
	yaxis: {
		labels: {
			show: false,
		},
	},
	series: [
		{
			name: "spend",
			data: [30, 15, 25, 12, 40, 20],
		},
	],
};

// chart series
// const series = [
// 	{
// 		name: "spend",
// 		data: [28, 18, 28, 19, 12, 25, 35, 20, 30, 40, 50, 60],
// 	},
// ];

export default function YourAccountPage() {
	const [selectedMonth, setSelectedMonth] = useState("January");

	const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedMonth(e.target.value);
	};

	return (
		<div className="p-4">
			{/* heading */}
			<div className="flex justify-between items-center mb-6">
				{/* avatar / user image */}
				<div className="border-2 border-[#7F3DFF] rounded-full h-[50px] w-[50px] overflow-hidden p-1">
					<Image
						className="h-full w-full rounded-full object-cover"
						src={AvatarImg}
						alt="user-name"
					/>
				</div>
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
					<NotificationIcon />
				</button>
			</div>

			{/* account balance */}
			<div className="text-center mb-[27px]">
				<p className="text-[#91919F] text-lg font-medium">Account balance</p>
				<p className="text-[#161719] text-[40px] font-semibold">$4000</p>
			</div>

			{/* income/expense */}
			<div className="flex justify-between gap-4">
				{/* income */}
				<div className="flex items-center bg-[#00A86B] h-[80px] rounded-3xl px-4 py-[17px] w-full">
					<div className="flex items-center justify-center h-[48px] w-[48px] bg-[#FCFCFC] rounded-2xl mr-2.5">
						<IncomeIcon />
					</div>
					<div>
						<p className="font-medium text-sm text-[#FCFCFC]">Income</p>
						<p className="text-[#FCFCFC] text-[22px] font-semibold">$5000</p>
					</div>
				</div>

				{/* Expenses */}
				<div className="flex items-center bg-[#FD3C4A] h-[80px] rounded-3xl px-4 py-[17px] w-full">
					<div className="flex items-center justify-center h-[48px] w-[48px] bg-[#FCFCFC] rounded-2xl mr-2.5">
						<ExpenseIcon />
					</div>
					<div>
						<p className="font-medium text-sm text-[#FCFCFC]">Expenses</p>
						<p className="text-[#FCFCFC] text-[22px] font-semibold">$2000</p>
					</div>
				</div>
			</div>

			{/* Spend Frequency */}
			<div className="mt-[23px]">
				<p className="font-semibold text-lg text-[#0D0E0F]">Spend Frequency</p>
				{/* radialbars chart */}
				<div id="chart" className="h-[193px]">
					<Chart
						options={options}
						series={options.series}
						type="area"
						height={185}
					/>
				</div>
				{/* filter option for chart */}
				<div className="flex justify-between">
					<button className="bg-[#FCEED4] px-6 py-2 font-bold text-sm text-[#FCAC12] rounded-3xl">
						Today
					</button>
					<button className="px-6 py-2 font-medium text-sm text-[#91919F] rounded-3xl">
						Week
					</button>
					<button className="px-6 py-2 font-medium text-sm text-[#91919F] rounded-3xl">
						Month
					</button>
					<button className="px-6 py-2 font-medium text-sm text-[#91919F] rounded-3xl">
						Year
					</button>
				</div>

				{/* recenter transaction */}
				<div className="mt-4 flex items-center justify-between">
					<p className="font-semibold text-lg text-[#292B2D]">
						Recent Transaction
					</p>
					<button className="bg-[#EEE5FF] px-6 py-2 font-medium text-sm text-[#7F3DFF] rounded-3xl">
						Sell all
					</button>
				</div>

				{/* transaction list */}
				<div className="mt-4 flex flex-col gap-2">
					<div className="flex items-center justify-between bg-[#FCFCFC] py-[14px] px-4 rounded-3xl">
						<div className="flex items-center gap-4">
							<div className="flex items-center justify-center h-[48px] w-[48px] bg-[#FCEED4] rounded-2xl">
								<ShoppingBagIcon />
							</div>
							<div>
								<p className="font-medium text-base text-[#292B2D]">Shopping</p>
								<p className="text-[#91919F] text-[14px] mt-1">
									Buy some grocery
								</p>
							</div>
						</div>
						<div className="text-right">
							<p className="font-semibold text-base text-[#FD3C4A]">- $5000</p>
							<p className="text-[#91919F] text-[14px] mt-1">10:00 AM</p>
						</div>
					</div>
					<div className="flex items-center justify-between bg-[#FCFCFC] py-[14px] px-4 rounded-3xl">
						<div className="flex items-center gap-4">
							<div className="flex items-center justify-center h-[48px] w-[48px] bg-[#FCEED4] rounded-2xl">
								<ShoppingBagIcon />
							</div>
							<div>
								<p className="font-medium text-base text-[#292B2D]">Food</p>
								<p className="text-[#91919F] text-[14px] mt-1">Buy a pizza</p>
							</div>
						</div>
						<div className="text-right">
							<p className="font-semibold text-base text-[#FD3C4A]">- $120</p>
							<p className="text-[#91919F] text-[14px] mt-1">10:00 AM</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
