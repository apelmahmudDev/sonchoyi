import { auth } from "@/auth";
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
import { getSubAccountsByUserId, getUserByEmail } from "@/database/queries";
import BackToAccount from "./(components)/BackToAccount";

export default async function IncomePage() {
	const session = await auth();
	const user = await getUserByEmail(session?.user?.email as string);
	const subAccounts = await getSubAccountsByUserId(user?.id);

	const addIncome = async (formData) => {
		"use server";

		const incomeData = {
			userId: user?.id,
			accountId: formData.get("accountId"),
			category: formData.get("category"),
			amount: parseFloat(formData.get("amount")),
			description: formData.get("description"),
		};

		try {
			const response = await fetch("http://localhost:3000/api/income", {
				method: "POST",
				body: JSON.stringify(incomeData),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const result = await response.json();

			if (!response.ok) {
				console.error("Error from server:", result.error);
			} else {
				console.log("Success:", result);
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

	return (
		<form action={addIncome} className="flex flex-col p-0 h-screen">
			{/* how much amount to be add */}
			<div className="bg-[#00A86B] px-4 pt-4 pb-8">
				<div className="flex items-center mb-[60px]">
					<BackToAccount />
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
							name="amount"
							defaultValue="0"
							type="number"
							className="bg-transparent text-[#FCFCFC] text-[64px] font-semibold w-full min-w-200 focus:outline-none outline-none border-none p-1"
						/>
					</div>
				</div>
			</div>
			<div className="flex-1 bg-white p-4 relative -top-5 rounded-t-2xl">
				{/* select - income category */}
				<Select name="category">
					<SelectTrigger className="w-full h-[56px] rounded-xl font-medium border-[#F1F1FA] shadow-none">
						<SelectValue placeholder="Category" />
					</SelectTrigger>
					<SelectContent className="h-[200px]">
						<SelectGroup>
							<SelectItem value="Salary">Salary</SelectItem>
							<SelectItem value="Bonus">Bonus</SelectItem>
							<SelectItem value="Interest">Interest</SelectItem>
							<SelectItem value="Business">Business</SelectItem>
							<SelectItem value="Investments">Investments</SelectItem>
							<SelectItem value="Freelance">Freelance</SelectItem>
							<SelectItem value="Savings ">Savings</SelectItem>
							<SelectItem value="Pension ">Pension</SelectItem>
							<SelectItem value="Tutoring ">Tutoring</SelectItem>
							<SelectItem value="Selling ">Selling Goods</SelectItem>
							<SelectItem value="other">Other</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<Input
					name="description"
					placeholder="Description"
					className="w-full h-[56px] rounded-xl font-medium border-[#F1F1FA] shadow-none mt-4"
				/>
				{/* select - account type*/}
				<div className="mt-4">
					<Select name="accountId">
						<SelectTrigger className="w-full h-[56px] rounded-xl font-medium border-[#F1F1FA] shadow-none">
							<SelectValue placeholder="Account" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{subAccounts?.map((account) => (
									<SelectItem key={account?.id} value={account?.id}>
										{account?.accountName}
									</SelectItem>
								))}
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
			</div>
		</form>
	);
}
