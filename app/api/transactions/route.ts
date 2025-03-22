import { NextResponse } from "next/server";
import { connectToDatabase } from "@/service/mongo";
import { mainAccountModel } from "@/models/main-account";
import { transactionModel } from "@/models/transactions-model";
import { subAccountModel } from "@/models/sub-account-model";
import createErrorResponse from "@/lib/createErrorResponse";

export const POST = async (request: Request) => {
	try {
		const {
			userId,
			type,
			amount,
			accountId,
			fromAccountId,
			toAccountId,
			category,
			description,
			date,
		} = await request.json();

		// Ensure database connection
		await connectToDatabase();

		// Validate basic fields
		if (!userId || !type || !amount || amount <= 0) {
			return NextResponse.json(
				{ error: "Invalid transaction data." },
				{ status: 400 }
			);
		}

		// Fetch the main account
		const mainAccount = await mainAccountModel.findOne({ userId });
		if (!mainAccount) {
			return NextResponse.json(
				{ error: "Main account not found." },
				{ status: 404 }
			);
		}

		// Handle transaction types
		switch (type) {
			case "income":
				if (!accountId || !category) {
					return NextResponse.json(
						{ error: "Income requires account and category." },
						{ status: 400 }
					);
				}

				// Update sub-account and main account balances
				const incomeAccount = await subAccountModel.findById(accountId);
				if (!incomeAccount) {
					return NextResponse.json(
						{ error: "Account not found." },
						{ status: 404 }
					);
				}
				incomeAccount.balance += amount;
				await incomeAccount.save();

				mainAccount.totalBalance += amount;
				mainAccount.totalIncome += amount;
				await mainAccount.save();

				break;

			case "expense":
				if (!accountId || !category) {
					return NextResponse.json(
						{ error: "Expense requires account and category." },
						{ status: 400 }
					);
				}

				// Update sub-account and main account balances
				const expenseAccount = await subAccountModel.findById(accountId);
				if (!expenseAccount || expenseAccount.balance < amount) {
					return NextResponse.json(
						{ error: "Insufficient balance." },
						{ status: 400 }
					);
				}
				expenseAccount.balance -= amount;
				await expenseAccount.save();

				mainAccount.totalBalance -= amount;
				mainAccount.totalExpense += amount;
				await mainAccount.save();

				break;

			case "transfer":
				if (!fromAccountId || !toAccountId || fromAccountId === toAccountId) {
					return NextResponse.json(
						{ error: "Invalid transfer accounts." },
						{ status: 400 }
					);
				}

				// Update balances of both accounts
				const fromAccount = await subAccountModel.findById(fromAccountId);
				const toAccount = await subAccountModel.findById(toAccountId);

				if (!fromAccount || !toAccount || fromAccount.balance < amount) {
					return NextResponse.json(
						{ error: "Invalid transfer operation." },
						{ status: 400 }
					);
				}

				fromAccount.balance -= amount;
				toAccount.balance += amount;

				await fromAccount.save();
				await toAccount.save();

				break;

			default:
				return NextResponse.json(
					{ error: "Invalid transaction type." },
					{ status: 400 }
				);
		}

		// Create the transaction record
		const transaction = await transactionModel.create({
			userId,
			type,
			accountId,
			fromAccountId,
			toAccountId,
			amount,
			category,
			description,
			date,
		});

		return NextResponse.json(
			{ message: "Transaction recorded successfully.", transaction },
			{ status: 201 }
		);
	} catch {
		return createErrorResponse({
			message: "Error creating transaction. Please try again later.",
			status: 500,
		});
	}
};
