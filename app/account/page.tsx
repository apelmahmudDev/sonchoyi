"use client";
import { useState } from "react";

export default function YourAccountPage() {
	const [selectedMonth, setSelectedMonth] = useState("January");

	const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedMonth(e.target.value);
	};

	return (
		<div className="p-4">
			<div className="flex justify-between">
				{/* avatar */}
				<img
					src="https://plus.unsplash.com/premium_photo-1668319914124-57301e0a1850?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="Avatar"
					className="w-[55px] h-[55px] rounded-full object-cover mb-4"
				/>
				{/* select field of month */}
				<div className="mb-4 flex-shrink-0 text-center">
					<label className="block text-sm font-medium mb-2" htmlFor="month">
						Select Month
					</label>
					<select
						id="month"
						value={selectedMonth}
						onChange={handleMonthChange}
						className="w-full p-2 border border-gray-300 rounded"
					>
						<option value="January">January</option>
						<option value="February">February</option>
						<option value="March">March</option>
						<option value="April">April</option>
						<option value="May">May</option>
						<option value="June">June</option>
						<option value="July">July</option>
						<option value="August">August</option>
						<option value="September">September</option>
						<option value="October">October</option>
						<option value="November">November</option>
						<option value="December">December</option>
					</select>
				</div>
				{/* notification */}
				<div>notification</div>
			</div>
			<div className="text-center">
				<p className="text-[#91919F] text-lg font-medium">Account balance</p>
				<p className="text-[#161719] text-[40px] font-semibold">$4000</p>
			</div>
			<div className="flex justify-between">
				{/* income */}
				<div>
					<p className="font-medium text-lg text-[#919191]">Income</p>
					<p className="text-[#161719] text-2xl font-semibold">$2000</p>
				</div>
				{/* Expenses */}
				<div>
					<p className="font-medium text-lg text-[#919191]">Expenses</p>
					<p className="text-[#161719] text-2xl font-semibold">$2000</p>
				</div>
			</div>
		</div>
	);
}
