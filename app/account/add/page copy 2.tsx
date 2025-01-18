"use client";
import { auth } from "@/auth";
import BackToAccount from "@/components/BackToAccount";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Bank from "@/components/Bank";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { getUserByEmail } from "@/database/queries";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Reusable constants
const accountTypes = [
	"Bank",
	"Credit Card",
	"Cash",
	"Digital Wallet",
	"Savings",
] as const;
const bankNames = [
	"IBBL",
	"DBBL",
	"Sonali Bank",
	"HSBC",
	"City Bank",
	"Other",
] as const;

const formSchema = z.object({
	accountName: z
		.string()
		.nonempty({ message: "Wallet name is required." })
		.min(3, { message: "Account name must be at least 3 characters." })
		.max(100, { message: "Account name cannot exceed 100 characters." }),
	accountType: z.enum(
		["Bank", "Credit Card", "Cash", "Digital Wallet", "Savings"],
		{
			message: "Account type must be one of the predefined types.",
		}
	),
	bankName: z
		.string()
		.optional()
		.refine(
			(value) =>
				!value ||
				["IBBL", "DBBL", "Sonali Bank", "HSBC", "City Bank", "Other"].includes(
					value
				),
			{
				message: "Bank name must be a valid option if provided.",
			}
		),
	balance: z.number().min(0, { message: "Balance cannot be negative." }),
});

export default function AddAccountPage() {
	// const session = await auth();
	// const user = await getUserByEmail(session?.user?.email as string);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			balance: 0,
		},
	});

	// const addAccount = async (formData) => {
	// 	// "use server";
	// 	const accountData = {
	// 		userId: user?.id,
	// 		accountName: formData.get("accountName"),
	// 		accountType: formData.get("accountType"),
	// 		bankName: formData.get("bankName"),
	// 		balance: parseFloat(formData.get("balance")),
	// 	};

	// 	try {
	// 		const response = await fetch("http://localhost:3000/api/account", {
	// 			method: "POST",
	// 			body: JSON.stringify(accountData),
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 		});

	// 		const result = await response.json();

	// 		if (!response.ok) {
	// 			console.error("Error from server:", result.error);
	// 		} else {
	// 			console.log("Success:", result);
	// 		}
	// 	} catch (error) {
	// 		console.error("Network error:", error);
	// 	}
	// };
	async function addAccount(values: z.infer<typeof formSchema>) {
		console.log("values", values);
		// try {
		// 	const response = await login({
		// 		email: values.email,
		// 		password: values.password,
		// 	});
		// 	if (!!response.error) {
		// 		setError(response.error?.message);
		// 	} else {
		// 		router.push("/letsgo");
		// 	}
		// } catch (error) {
		// 	setError(error as string);
		// }
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(addAccount)}
				className="flex flex-col p-0 h-screen"
			>
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
							<FormField
								control={form.control}
								name="balance"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center">
											<FormLabel className="text-left text-[#FCFCFC] text-[64px] font-semibold">
												$
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="0.00"
													className="bg-transparent text-[#FCFCFC] text-[64px] font-semibold w-full min-w-200 focus:outline-none outline-none border-none p-1"
												/>
											</FormControl>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="flex-1 bg-white p-4 relative -top-5 rounded-t-2xl">
					<FormField
						control={form.control}
						name="accountName"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										placeholder="Wallet Name"
										className="w-full h-[56px] rounded-xl font-medium border-[#F1F1FA] shadow-none mt-4"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* select - account type*/}
					<div className="mt-4">
						{/* <Select name="accountType">
							<SelectTrigger className="w-full h-[56px] rounded-xl font-medium border-[#F1F1FA] shadow-none">
								<SelectValue placeholder="Account Type" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{accountTypes?.map((account) => (
										<SelectItem key={account} value={account}>
											{account}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select> */}
						<FormField
							control={form.control}
							name="accountType"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Select
											onValueChange={field.onChange} // Handle value change for the form
											value={field.value} // Controlled value
										>
											<SelectTrigger className="w-full h-[56px] rounded-xl font-medium border-[#F1F1FA] shadow-none">
												<SelectValue placeholder="Account Type" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{accountTypes.map((account) => (
														<SelectItem key={account} value={account}>
															{account}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{/* select - Bank*/}
					<div className="mt-4">
						{/* <Select name="bankName">
							<SelectTrigger className="w-full h-[56px] rounded-xl font-medium border-[#F1F1FA] shadow-none">
								<SelectValue placeholder="Bank" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{bankNames?.map((bank) => (
										<SelectItem key={bank} value={bank}>
											{bank}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select> */}
						{/* <div className="mt-2">
							<p className="text-black font-medium font-base mb-2">Bank</p>
							<div className="flex gap-2 flex-wrap">
								<Bank bankIcon={<span>IBBL</span>} />
								<Bank bankIcon={<span>DBBL</span>} />
								<Bank bankIcon={<span>Sonali Bank</span>} />
								<Bank bankIcon={<span>HSBC</span>} />
								<Bank bankIcon={<span>City Bank</span>} />
								<Bank bankIcon={<span>Other</span>} />
							</div>
						</div> */}
						{/* Render Bank Selection if accountType is "Bank" */}
						{form.watch("accountType") === "Bank" && (
							<FormField
								control={form.control}
								name="bankName"
								render={({ field }) => (
									<FormItem className="mt-4">
										<p className="text-black font-medium font-base mb-2">
											Bank
										</p>
										<FormControl>
											<div className="flex gap-2 flex-wrap">
												{bankNames.map((bank) => (
													<Bank
														key={bank}
														onSelect={() => field.onChange(bank)}
														bankIcon={<span>{bank}</span>}
														selected={form.watch("bankName") === bank}
													/>
												))}
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					</div>
					<Button
						type="submit"
						className="w-full h-[56px] rounded-xl font-medium bg-[#7F3DFF] text-white mt-4"
					>
						Continue
					</Button>
				</div>
			</form>
		</Form>
	);
}
