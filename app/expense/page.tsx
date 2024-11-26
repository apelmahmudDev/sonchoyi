"use client";
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

export default function ExpensePage() {
	const router = useRouter();

	const handleNavigateBack = () => {
		router.push("/account");
	};

	return (
		<div className="flex flex-col p-0 h-screen">
			{/* how much amount to be add */}
			<div className="bg-[#FD3C4A] px-4 pt-4 pb-8">
				<div className="flex items-center mb-[60px]">
					<button onClick={handleNavigateBack} className="text-white">
						<ArrowLeftIcon />
					</button>
					<p className="mx-auto text-center text-white text-lg font-semibold pr-8">
						Expense
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
				<form action="">
					{/* category / should be multiple option select filed */}
					<Select>
						<SelectTrigger className="w-full h-[56px] rounded-xl font-medium border-[#F1F1FA] shadow-none">
							<SelectValue placeholder="Category" />
						</SelectTrigger>
						<SelectContent className="h-[200px]">
							<SelectGroup>
								<SelectItem value="subscription">Subscription</SelectItem>
								<SelectItem value="food">Food</SelectItem>
								<SelectItem value="transport">Transport</SelectItem>
								<SelectItem value="shopping">Shopping</SelectItem>
								<SelectItem value="health">Health</SelectItem>
								<SelectItem value="entertainment">Entertainment</SelectItem>
								<SelectItem value="education">Education</SelectItem>
								<SelectItem value="others">Others</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<Input
						placeholder="Description"
						className="w-full h-[56px] rounded-xl font-medium border-[#F1F1FA] shadow-none mt-4"
					/>
					{/* select - account type*/}
					<div className="mt-4">
						<Select>
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
						Add Expense
					</Button>
				</form>
			</div>
		</div>
	);
}
