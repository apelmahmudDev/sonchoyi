"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/breadcrumb";
import Header from "@/components/Header";
import Bank from "@/components/Bank";
import { toast } from "sonner";

import { useSession } from "next-auth/react";
import { useGetUserByEmailQuery } from "@/lib/api/services/userApi";
import { useCreateAccountMutation } from "@/lib/api/services/accountApi";

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

const FormSchema = z
	.object({
		balance: z.string().nonempty({
			message: "(Please enter the amount)",
		}),
		accountName: z
			.string()
			.nonempty({
				message: "Name is required.",
			})
			.min(3, { message: "Name must be at least 3 characters." })
			.max(30, { message: "Name cannot exceed 30 characters." }),
		accountType: z.string().nonempty({
			message: "Please select an account type.",
		}),
		bankName: z.string().optional(),
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
		if (data.accountType !== "Bank") {
			delete data.bankName;
		}
		return data;
	});

export default function AccountCreate() {
	const { data: session } = useSession();

	const { data: userResponse } = useGetUserByEmailQuery(
		session?.user?.email ?? "",
		{
			skip: !session?.user?.email,
		}
	);

	const [createAccount, { isLoading: accountCreating }] =
		useCreateAccountMutation();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			balance: "",
			accountName: "",
			accountType: "",
			bankName: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const accountData = {
			userId: userResponse?.data?.id as string,
			balance: data?.balance,
			accountName: data?.accountName,
			accountType: data?.accountType,
			bankName: data?.bankName,
		};

		try {
			await createAccount(accountData).unwrap();
			toast.success("Account has been created.");

			// ✅ Reset form fields
			form.reset();
		} catch {
			toast.error("Failed to create account.");
		}
	}

	return (
		<section className="max-w-7xl mx-auto">
			<Header title="Create a new wallet account" />
			<Breadcrumb
				className="mt-5 mb-9"
				breadcrumbLinks={[
					{ label: "Wallet", to: "/my-wallet" },
					{ label: "Account", to: "/my-wallet/account" },
					{ label: "Create" },
				]}
			/>

			<div className="max-w-5xl mx-auto">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<Card className="pt-0 overflow-hidden">
							{/* Balance input field*/}
							<CardHeader className="relative bg-blue-100 py-4">
								<CardTitle className="text-left text-[#fcb7bc] mb-2">
									Balance
								</CardTitle>
								<CardDescription className="text-light-100">
									<div className="flex items-center">
										<label className="text-left text-[#FCFCFC] text-4xl md:text-[40px]  font-semibold">
											$
										</label>
										<FormField
											control={form.control}
											name="balance"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															{...field}
															autoFocus={false}
															placeholder="E.g. 1500.75"
															type="number"
															className="border-0 shadow-none placeholder:text-[#fcb7bc] !text-3xl md:!text-[36px] font-semibold focus-visible:ring-0"
														/>
													</FormControl>
													<FormMessage className="absolute top-3.5 left-[90px] text-[#82181a]" />
												</FormItem>
											)}
										/>
									</div>
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								{/* Name input field*/}
								<FormField
									control={form.control}
									name="accountName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="E.g. Personal Savings, Travel Fund"
													className="w-full h-[56px] rounded-xl font-medium shadow-none"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Account type field */}
								<FormField
									control={form.control}
									name="accountType"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Type</FormLabel>
											<Select
												onValueChange={field.onChange}
												value={field.value}
											>
												<FormControl>
													<SelectTrigger className="w-full h-[56px] rounded-xl font-medium shadow-none">
														<SelectValue placeholder="Account Type" />
													</SelectTrigger>
												</FormControl>
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
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* select - Bank*/}
								<div className="mt-4">
									{/* Render Bank Selection if accountType is "Bank" */}
									{form.watch("accountType") === "Bank" && (
										<FormField
											control={form.control}
											name="bankName"
											render={({ field }) => (
												<FormItem className="mt-4">
													<FormLabel>Bank</FormLabel>
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
							</CardContent>
						</Card>
						<div className="flex">
							<Button
								disabled={accountCreating}
								size="lg"
								className="mt-10 ml-auto"
								type="submit"
							>
								{accountCreating ? "Creating..." : "Create Account"}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</section>
	);
}
