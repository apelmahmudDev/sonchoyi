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
import { toast } from "sonner";
import Link from "next/link";

import { Expense, SubAccount } from "@/types";
import { useSession } from "next-auth/react";

import { useGetUserByEmailQuery } from "@/lib/api/services/userApi";
import { useGetSubAccountsByUserIdQuery } from "@/lib/api/services/subAccountApi";
import { useCreateExpenseMutation } from "@/lib/api/services/expenseApi";

const FormSchema = z.object({
	amount: z.string().nonempty({
		message: "(Please enter the amount)",
	}),
	category: z.string().nonempty({
		message: "Please select a category",
	}),
	description: z.string().nonempty({
		message: "Write a short note to remember why",
	}),
	accountId: z.string().nonempty({
		message: "Please select an account",
	}),
});

export default function ExpenseCreate() {
	const { data: session } = useSession();

	const { data: userResponse } = useGetUserByEmailQuery(
		session?.user?.email ?? "",
		{
			skip: !session?.user?.email,
		}
	);

	const { data: subAccountsResponse } = useGetSubAccountsByUserIdQuery(
		userResponse?.data?.id as string,
		{
			skip: !userResponse?.data?.id,
		}
	);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			amount: "",
			category: "",
			description: "",
			accountId: "",
		},
	});

	const [createExpense, { isLoading: isExpenseCreating }] =
		useCreateExpenseMutation();

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const expenseData: Expense = {
			userId: userResponse?.data?.id as string,
			accountId: data?.accountId,
			category: data?.category,
			amount: parseFloat(data?.amount),
			description: data?.description,
		};

		try {
			await createExpense(expenseData).unwrap();
			toast.success("Expense created successfully!");

			// ✅ Reset form fields
			form.reset();
		} catch {
			toast.error("Failed to add expense.");
		}
	}

	return (
		<section className="max-w-7xl mx-auto">
			<Header title="Create a new expense" />
			<Breadcrumb
				className="mt-5 mb-9"
				breadcrumbLinks={[
					{ label: "Wallet", to: "/my-wallet" },
					{ label: "Expense", to: "/my-wallet/expense" },
					{ label: "Create" },
				]}
			/>

			<div className="max-w-5xl mx-auto">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<Card className="pt-0 overflow-hidden">
							<CardHeader className="relative bg-red-100 py-4">
								<CardTitle className="text-left text-[#fcb7bc] mb-2">
									How much?
								</CardTitle>
								<CardDescription className="text-light-100">
									<div className="flex items-center">
										<label className="text-left text-[#FCFCFC] text-4xl md:text-[40px]  font-semibold">
											$
										</label>
										<FormField
											control={form.control}
											name="amount"
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
													<FormMessage className="absolute top-3.5 left-[125px] text-[#82181a]" />
												</FormItem>
											)}
										/>
									</div>
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								{/* select - income category */}
								<FormField
									control={form.control}
									name="category"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Category</FormLabel>
											<Select
												onValueChange={field.onChange}
												value={field.value}
											>
												<FormControl>
													<SelectTrigger className="w-full h-[56px] rounded-xl font-medium shadow-none">
														{/* <SelectTrigger
													className={cn(
														"w-full h-[56px] rounded-xl font-medium shadow-none",
														form.formState.errors.category
															? "border-red-500"
															: "" && "border-[#82181a]"
													)}
												> */}
														<SelectValue placeholder="Select a category" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectGroup>
														<SelectItem value="Food">Food</SelectItem>
														<SelectItem value="Rent">Rent</SelectItem>
														<SelectItem value="Utilities">Utilities</SelectItem>
														<SelectItem value="Transportation">
															Transportation
														</SelectItem>
														<SelectItem value="Entertainment">
															Entertainment
														</SelectItem>
														<SelectItem value="Healthcare">
															Healthcare
														</SelectItem>
														<SelectItem value="Education">Education</SelectItem>
														<SelectItem value="Shopping">Shopping</SelectItem>
														<SelectItem value="Travel">Travel</SelectItem>
														<SelectItem value="Other">Other</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="E.g. Salary, Gift, Savings..."
													className="w-full h-[56px] rounded-xl font-medium shadow-none"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="accountId"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Account</FormLabel>
											<Select
												disabled={!subAccountsResponse?.data?.length}
												onValueChange={field.onChange}
												value={field.value}
											>
												<FormControl>
													<SelectTrigger className="w-full h-[56px] rounded-xl font-medium shadow-none">
														<SelectValue
															placeholder={
																subAccountsResponse?.data?.length
																	? "Select an account"
																	: "No account"
															}
														/>
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectGroup>
														{subAccountsResponse?.data?.map(
															(account: SubAccount) => (
																<SelectItem
																	key={account?.id}
																	value={account?.id}
																>
																	{account?.accountName}
																</SelectItem>
															)
														)}
													</SelectGroup>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
						</Card>
						<div className="flex gap-10 flex-col md:flex-row mt-10">
							{/* NOTES! */}
							<div>
								<div className="text-sm mb-2 font-medium">NOTES</div>
								<p className="text-sm inline mr-1">
									You have <strong>insufficient</strong> balance to add this
									expense. Please{" "}
									<Link
										className="text-sm hover:underline underline-offset-2 font-medium text-blue-100"
										href="/my-wallet/income/create"
									>
										add funds
									</Link>{" "}
									or choose a different account.
								</p>
							</div>
							<Button
								disabled={isExpenseCreating}
								size="lg"
								className="ml-auto"
								type="submit"
							>
								{isExpenseCreating ? "Creating..." : "Create Expense"}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</section>
	);
}
