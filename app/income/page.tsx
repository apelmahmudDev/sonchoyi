"use client";
import { auth } from "@/auth";
import { ArrowLeftIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function IncomePage() {
	const router = useRouter();
	const session = auth();
	const [incomeInfo, setIncomeInfo] = useState(null);
	const handleNavigateBack = () => {
		router.push("/account");
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		fetch("/api/income", {
			method: "POST",
			body: JSON.stringify(incomeInfo),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				console.log(res);
				router.push("/account");
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<div className="flex flex-col p-0 h-screen">
			{/* how much amount to be add */}
			<div className="bg-[#00A86B] px-4 pt-4 pb-8">
				<div className="flex items-center mb-[60px]">
					<button onClick={handleNavigateBack} className="text-white">
						<ArrowLeftIcon />
					</button>
					<p className="mx-auto text-center text-white text-lg font-semibold pr-8">
						Income
					</p>
				</div>
				<div>
					<p className="text-left text-[#fcb7bc] text-lg font-semibold mb-3">
						How much?
					</p>
					<div className="flex items-center">
						<label className="text-left text-[#FCFCFC] text-[64px] font-semibold">
							$
						</label>
						<Input
							defaultValue="0"
							type="number"
							className="bg-transparent text-[#FCFCFC] text-[64px] font-semibold w-full min-w-200 focus:outline-none outline-none border-none p-1"
						/>
					</div>
				</div>
			</div>

			{/* settings options */}
			<div className="flex-1 bg-white p-4 relative -top-5 rounded-t-2xl">
				<form onSubmit={handleSubmit}>
					{/* select - income category */}
					<Select
						onValueChange={(value) =>
							setIncomeInfo((prev) => ({ ...prev, category: value }))
						}
					>
						<SelectTrigger
							onChange={() => {
								console.log("click");
							}}
							className="w-full h-[56px] rounded-xl font-medium border-[#F1F1FA] shadow-none"
						>
							<SelectValue placeholder="Category" />
						</SelectTrigger>
						<SelectContent className="h-[200px]">
							<SelectGroup>
								<SelectItem value="salary">Salary</SelectItem>
								<SelectItem value="bonus">Bonus</SelectItem>
								<SelectItem value="interest">Interest</SelectItem>
								<SelectItem value="business">Business</SelectItem>
								<SelectItem value="investments">Investments</SelectItem>
								<SelectItem value="freelance">Freelance</SelectItem>
								<SelectItem value="savings ">Savings</SelectItem>
								<SelectItem value="pension ">Pension</SelectItem>
								<SelectItem value="tutoring ">Tutoring</SelectItem>
								<SelectItem value="selling ">Selling Goods</SelectItem>
								<SelectItem value="other">Other</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<Input
						onChange={(e) =>
							setIncomeInfo((prev) => ({
								...prev,
								description: e.target.value,
							}))
						}
						placeholder="Description"
						className="w-full h-[56px] rounded-xl font-medium border-[#F1F1FA] shadow-none mt-4"
					/>
					{/* select - account type*/}
					<div className="mt-4">
						<Select
							onValueChange={(value) =>
								setIncomeInfo((prev) => ({ ...prev, type: value }))
							}
						>
							<SelectTrigger className="w-full h-[56px] rounded-xl font-medium border-[#F1F1FA] shadow-none">
								<SelectValue placeholder="Account" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="cash">Cash</SelectItem>
									<SelectItem value="bank">Bank</SelectItem>
									<SelectItem value="credit">Credit</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<Button
						type="submit"
						className="w-full h-[56px] rounded-xl font-medium bg-[#7F3DFF] text-white mt-4"
					>
						Add Income
					</Button>
				</form>
			</div>
		</div>
	);
}
