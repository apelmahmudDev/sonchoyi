"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AddAccountPage() {
	const router = useRouter();
	const [balance, setBalance] = useState("");
	const [bankName, setBankName] = useState("");
	const [accountName, setAccountName] = useState("");
	const [accountType, setAccountType] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log({ accountName, accountType, balance, bankName });
		// router.push("/dashboard");
	};

	return (
		<div className="p-4">
			<h1 className="font-medium text-4xl my-5">Add New Account</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						className="block text-sm font-medium mb-2"
						htmlFor="accountName"
					>
						Account Name
					</label>
					<input
						type="text"
						id="accountName"
						value={accountName}
						onChange={(e) => setAccountName(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-sm font-medium mb-2"
						htmlFor="accountType"
					>
						Account Type
					</label>
					<select
						id="accountType"
						value={accountType}
						onChange={(e) => setAccountType(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded"
						required
					>
						<option value="">Select Account Type</option>
						<option value="Bank">Bank</option>
						<option value="Credit Card">Credit Card</option>
						<option value="Wallet">Wallet</option>
					</select>
				</div>
				{accountType === "Bank" && (
					<div className="mb-4">
						<label
							className="block text-sm font-medium mb-2"
							htmlFor="bankName"
						>
							Bank Name
						</label>
						<select
							id="bankName"
							value={bankName}
							onChange={(e) => setBankName(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded"
							required
						>
							<option value="">Select Bank Name</option>
							<option value="Bank of America">Bank of America</option>
							<option value="Chase">Chase</option>
							<option value="Wells Fargo">Wells Fargo</option>
							<option value="Citi">Citi</option>
						</select>
					</div>
				)}
				<div className="mb-4">
					<label className="block text-sm font-medium mb-2" htmlFor="balance">
						Balance
					</label>
					<input
						type="number"
						id="balance"
						value={balance}
						onChange={(e) => setBalance(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
				</div>
				<Button type="submit" className="w-full">
					Add Account
				</Button>
			</form>
		</div>
	);
}
