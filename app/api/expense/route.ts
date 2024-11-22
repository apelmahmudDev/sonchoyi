import { NextResponse } from "next/server";
import { connectToDatabase } from "@/service/mongo";
import { expenseModel } from "@/models/expense-model";
import { mainAccountModel } from "@/models/main-account";
import { subAccountModel } from "@/models/sub-account-model";
import { transactionModel } from "@/models/transactions-model";

export const POST = async (request: Request) => {
	try {
		const {
			userId,
			accountId,
			category,
			amount,
			description,
			attachment,
			repeat,
			date,
		} = await request.json();

		await connectToDatabase();

		// Validate input
		if (!userId || !accountId || !category || !amount || amount <= 0) {
			return NextResponse.json(
				{ error: "Invalid input data." },
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

		// Fetch the sub-account
		const account = await subAccountModel.findById(accountId);
		if (!account) {
			return NextResponse.json(
				{ error: "Account not found." },
				{ status: 404 }
			);
		}

		// Check if account has sufficient balance
		if (account.balance < amount) {
			return NextResponse.json(
				{ error: "Insufficient balance in the account." },
				{ status: 400 }
			);
		}

		// Step 1: Add expense to the database
		const newExpense = await expenseModel.create({
			userId,
			accountId,
			category,
			amount,
			description,
			attachment,
			repeat,
			date,
		});

		// Step 2: Update the sub-account balance
		account.balance -= amount;
		await account.save();

		// Step 3: Update the main account balance and total expense
		mainAccount.totalBalance -= amount;
		mainAccount.totalExpense += amount;

		// Update sub-account in linked accounts of the main account
		const linkedAccount = mainAccount.linkedAccounts.find(
			(account) => account.accountId.toString() === accountId
		);
		if (linkedAccount) {
			linkedAccount.balance -= amount;
		}
		await mainAccount.save();

		// Step 4: Log the transaction
		await transactionModel.create({
			userId,
			accountId,
			type: "expense",
			amount,
			category,
			description,
			date,
		});

		return NextResponse.json(
			{
				message: "Expense added successfully and transaction logged.",
				expense: newExpense,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error adding expense:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};
