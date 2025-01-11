import { auth } from "@/auth";
import BackToAccount from "@/components/BackToAccount";
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

export default async function ExpensePage() {
	const session = await auth();
	const user = await getUserByEmail(session?.user?.email as string);
	const subAccounts = await getSubAccountsByUserId(user?.id);

	const addExpense = async (formData) => {
		"use server";

		const expenseData = {
			userId: user?.id,
			accountId: formData.get("accountId"),
			category: formData.get("category"),
			amount: parseFloat(formData.get("amount")),
			description: formData.get("description"),
		};

		try {
			const response = await fetch("http://localhost:3000/api/expense", {
				method: "POST",
				body: JSON.stringify(expenseData),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error("Error from server:", result.error);
			} else {
				console.log("Success:", result);
			}
		} catch (error) {
			throw new Error("Network error:", error);
		}
	};

	return (
		<form action={addExpense} className="flex flex-col p-0 h-screen">
			{/* how much amount to be add */}
			<div className="bg-[#FD3C4A] px-4 pt-4 pb-8">
				<div className="flex items-center mb-[60px]">
					<BackToAccount />
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
							name="amount"
							defaultValue="0"
							type="number"
							className="bg-transparent text-[#FCFCFC] text-[64px] font-semibold w-full min-w-200 focus:outline-none outline-none border-none p-1"
						/>
					</div>
				</div>
			</div>
			<div className="flex-1 bg-white p-4 relative -top-5 rounded-t-2xl">
				{/* category / should be multiple option select filed */}
				<Select name="category">
					<SelectTrigger className="w-full h-[56px] rounded-xl font-medium border-[#F1F1FA] shadow-none">
						<SelectValue placeholder="Category" />
					</SelectTrigger>
					<SelectContent className="h-[200px]">
						<SelectGroup>
							<SelectItem value="Food">Food</SelectItem>
							<SelectItem value="Rent">Rent</SelectItem>
							<SelectItem value="Utilities">Utilities</SelectItem>
							<SelectItem value="Transportation">Transportation</SelectItem>
							<SelectItem value="Entertainment">Entertainment</SelectItem>
							<SelectItem value="Healthcare">Healthcare</SelectItem>
							<SelectItem value="Education ">Education</SelectItem>
							<SelectItem value="Shopping ">Shopping</SelectItem>
							<SelectItem value="Travel ">Travel</SelectItem>
							<SelectItem value="Other">Other</SelectItem>
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
					Add Expense
				</Button>
			</div>
		</form>
	);
}
