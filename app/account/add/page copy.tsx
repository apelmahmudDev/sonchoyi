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
import { getUserByEmail } from "@/database/queries";

const accounts = ["Bank", "Credit Card", "Cash", "Wallet"];
const banks = ["IBBL", "DBBL", "Sonali Bank", "HSBC", "City Bank", "Other"];

export default async function AddAccountPage() {
	const session = await auth();
	const user = await getUserByEmail(session?.user?.email as string);

	const addAccount = async (formData) => {
		"use server";
		const accountData = {
			userId: user?.id,
			accountName: formData.get("accountName"),
			accountType: formData.get("accountType"),
			bankName: formData.get("bankName"),
			balance: parseFloat(formData.get("balance")),
		};

		try {
			const response = await fetch("http://localhost:3000/api/account", {
				method: "POST",
				body: JSON.stringify(accountData),
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
		<form action={addAccount} className="flex flex-col p-0 h-screen">
			{/* how much amount to be add */}
			<div className="bg-[#7F3DFF] px-4 pt-4 pb-8">
				<div className="flex items-center mb-[60px]">
					<BackToAccount />
					<p className="mx-auto text-center text-white text-lg font-semibold pr-8">
						Add new account
					</p>
				</div>
				<div>
					<p className="text-left text-[#fcb7bc] text-lg font-semibold mb-3">
						Balance
					</p>
					<div className="flex items-center">
						<label className="text-left text-[#FCFCFC] text-[64px] font-semibold">
							$
						</label>
						<Input
							name="balance"
							defaultValue="0.00"
							type="number"
							className="bg-transparent text-[#FCFCFC] text-[64px] font-semibold w-full min-w-200 focus:outline-none outline-none border-none p-1"
						/>
					</div>
				</div>
			</div>
			<div className="flex-1 bg-white p-4 relative -top-5 rounded-t-2xl">
				<Input
					name="accountName"
					placeholder="Name"
					className="w-full h-[56px] rounded-xl font-medium border-[#F1F1FA] shadow-none mt-4"
				/>
				{/* select - account type*/}
				<div className="mt-4">
					<Select name="accountType">
						<SelectTrigger className="w-full h-[56px] rounded-xl font-medium border-[#F1F1FA] shadow-none">
							<SelectValue placeholder="Account" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{accounts?.map((account) => (
									<SelectItem key={account} value={account}>
										{account}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				{/* select - Bank*/}
				<div className="mt-4">
					<Select name="bankName">
						<SelectTrigger className="w-full h-[56px] rounded-xl font-medium border-[#F1F1FA] shadow-none">
							<SelectValue placeholder="Bank" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{banks?.map((bank) => (
									<SelectItem key={bank} value={bank}>
										{bank}
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
					Continue
				</Button>
			</div>
		</form>
	);
}
