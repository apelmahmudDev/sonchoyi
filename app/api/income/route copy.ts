import { NextResponse } from "next/server";
import { connectToDatabase } from "@/service/mongo";
import { incomeModel } from "@/models/income-model";
import { mainAccountModel } from "@/models/main-account";
import { subAccountModel } from "@/models/sub-account-model";

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

		// Update the sub-account balance
		account.balance += amount;
		await account.save();

		// Step 2: Fetch the main account for the user
		const mainAccount = await mainAccountModel.findOne({ userId });

		if (!mainAccount) {
			return NextResponse.json(
				{ error: "Main account not found." },
				{ status: 404 }
			);
		}

		// Update main account total balance
		mainAccount.totalBalance += amount;

		// Check if the sub-account exists in the linkedAccounts array
		const subAccountIndex = mainAccount.linkedAccounts.findIndex(
			(account) => account.accountId.toString() === accountId
		);

		if (subAccountIndex !== -1) {
			// Update the balance of the linked sub-account
			mainAccount.linkedAccounts[subAccountIndex].balance += amount;
		} else {
			// Optional: Handle the case where the sub-account is not in linkedAccounts
			mainAccount.linkedAccounts.push({
				accountId: account._id,
				accountName: account.accountName,
				balance: account.balance,
			});
		}

		// Save the updated main account
		await mainAccount.save();

		// Step 3: Create a new income document
		const newIncome = {
			userId,
			accountId,
			category,
			amount,
			description,
			attachment,
			repeat,
			date,
		};

		// Save the income record to the database
		const savedIncome = await incomeModel.create(newIncome);

		return NextResponse.json(
			{
				message: "Income record created successfully and accounts updated.",
				income: savedIncome,
				mainAccount,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating income record:", error);
		return NextResponse.json(
			{ error: error.message || "Internal Server Error" },
			{ status: 500 }
		);
	}
};
