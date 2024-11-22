import { NextResponse } from "next/server";
import { connectToDatabase } from "@/service/mongo";
import { expenseModel } from "@/models/expense-model"; // Assuming expenseModel exists
import { subAccountModel } from "@/models/sub-account-model";
import { mainAccountModel } from "@/models/main-account";

export const POST = async (request: Request) => {
	try {
		// Parse the request body
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

		// Ensure database connection
		await connectToDatabase();

		// Validate required fields
		if (!userId || !accountId || !category || !amount || !date) {
			return NextResponse.json(
				{ error: "Missing required fields." },
				{ status: 400 }
			);
		}

		// Ensure the amount is valid
		if (amount <= 0) {
			return NextResponse.json(
				{ error: "Amount must be greater than 0." },
				{ status: 400 }
			);
		}

		// Step 1: Fetch the sub-account to update its balance
		const account = await subAccountModel.findById(accountId);

		if (!account) {
			return NextResponse.json(
				{ error: "Sub-account not found." },
				{ status: 404 }
			);
		}

		// Ensure sufficient balance in the sub-account
		if (account.balance < amount) {
			return NextResponse.json(
				{ error: "Insufficient balance in the sub-account." },
				{ status: 400 }
			);
		}

		// Deduct the amount from the sub-account balance
		account.balance -= amount;
		await account.save();

		// Step 2: Fetch the main account for the user
		const mainAccount = await mainAccountModel.findOne({ userId });

		if (!mainAccount) {
			return NextResponse.json(
				{ error: "Main account not found." },
				{ status: 404 }
			);
		}

		// Ensure sufficient balance in the main account
		if (mainAccount.totalBalance < amount) {
			return NextResponse.json(
				{ error: "Insufficient balance in the main account." },
				{ status: 400 }
			);
		}

		// Update main account total balance
		mainAccount.totalBalance -= amount;

		// Check if the sub-account exists in the linkedAccounts array
		const subAccountIndex = mainAccount.linkedAccounts.findIndex(
			(account) => account.accountId.toString() === accountId
		);

		if (subAccountIndex !== -1) {
			// Deduct the balance from the linked sub-account
			mainAccount.linkedAccounts[subAccountIndex].balance -= amount;
		} else {
			// Optional: Handle the case where the sub-account is not in linkedAccounts
			return NextResponse.json(
				{ error: "Sub-account not found in main account." },
				{ status: 400 }
			);
		}

		// Save the updated main account
		await mainAccount.save();

		// Step 3: Create a new expense document
		const newExpense = {
			userId,
			accountId,
			category,
			amount,
			description,
			attachment,
			repeat,
			date,
		};

		// Save the expense record to the database
		const savedExpense = await expenseModel.create(newExpense);

		return NextResponse.json(
			{
				message: "Expense record created successfully and accounts updated.",
				expense: savedExpense,
				mainAccount,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating expense record:", error);
		return NextResponse.json(
			{ error: error.message || "Internal Server Error" },
			{ status: 500 }
		);
	}
};
