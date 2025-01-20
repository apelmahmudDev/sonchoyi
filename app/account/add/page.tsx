"use client";
import { useSession } from "next-auth/react";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

const formSchema = z
	.object({
		accountName: z
			.string({
				required_error: "Wallet name is required.",
			})
			.nonempty({ message: "Wallet name is required." })
			.min(3, { message: "Account name must be at least 3 characters." })
			.max(30, { message: "Account name cannot exceed 30 characters." }),
		accountType: z
			.string({
				required_error: "Account type is required.",
			})
			.nonempty({ message: "Account type is required." })
			.refine(
				(value) =>
					["Bank", "Credit Card", "Cash", "Digital Wallet", "Savings"].includes(
						value
					),
				{ message: "Invalid account type." }
			),
		bankName: z.string().optional(),
		balance: z.preprocess(
			(value) => {
				const numValue = parseFloat(value);
				return isNaN(numValue) ? undefined : numValue;
			},
			z
				.number({
					required_error: "Balance is required.",
				})
				.min(0, { message: "Balance must be a positive number." })
		),
	})
	.refine(
		(data) => {
			if (data.accountType === "Bank") {
				return !!data.bankName; // Ensure bankName is provided when accountType is "Bank"
			}
			return true; // Pass validation for other account types
		},
		{
			message: "Bank name is required when account type is 'Bank'.",
			path: ["bankName"], // Error will appear on the `bankName` field
		}
	)
	.transform((data) => {
		// Remove bankName if accountType is not "Bank"
		if (data.accountType !== "Bank") {
			delete data.bankName;
		}
		return data;
	});

export default function AddAccountPage() {
	const { data: session } = useSession();
	const [user, setUser] = useState(null);

	useEffect(() => {
		async function fetchUser() {
			if (session?.user?.email) {
				try {
					const response = await fetch(
						`/api/user?email=${session?.user?.email}`
					);
					if (response.ok) {
						const user = await response.json();
						setUser(user);
					} else {
						const errorText = await response.text();
						throw new Error(`API Error: ${errorText}`);
					}
				} catch (error) {
					// API or network error
					if (error instanceof Error) {
						throw new Error(`Caught error: ${error.message}`);
					} else {
						throw new Error(
							"An unexpected error occurred. Please try again later."
						);
					}
				}
			}
		}
		fetchUser();
	}, [session?.user?.email]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			balance: 0,
		},
	});

	async function addAccount(values: z.infer<typeof formSchema>) {
		try {
			const accountData = {
				userId: user?._id,
				accountName: values?.accountName,
				accountType: values?.accountType,
				bankName: values?.bankName,
				balance: values?.balance,
			};
			const response = await fetch("http://localhost:3000/api/account", {
				method: "POST",
				body: JSON.stringify(accountData),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const result = await response.json();

			if (!response.ok) {
				toast.error(result?.message);
			} else {
				toast.success(result?.message);
			}
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Caught error: ${error.message}`);
			} else {
				throw new Error(
					"An unexpected error occurred. Please try again later."
				);
			}
		}
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
													type="number"
													placeholder="0.00"
													className="bg-transparent text-[#FCFCFC] text-[60px] md:text-[64px] font-semibold w-full min-w-200 focus:outline-none outline-none border-none focus-visible:ring-0 shadow-none p-1 placeholder:text-[#fcb7bc]"
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
