import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/service/mongo";
import { mainAccountModel } from "@/models/main-account";
import { subAccountModel } from "@/models/sub-account-model";
import { incomeModel } from "@/models/income-model";
import { transactionModel } from "@/models/transactions-model";

export const POST = async (request: Request) => {
	try {
		const {
			userId,
			accountName,
			accountType,
			bankName,
			balance,
			currency = "USD",
		} = await request.json();

		// Ensure database connection
		await connectToDatabase();

		// Validate input fields
		if (!userId || !accountName || !accountType || !balance) {
			return new NextResponse("Please fill in all fields", {
				status: 400,
			});
		}

		// Step 1: Create the Sub-Account
		const newAccount = {
			userId: new ObjectId(userId),
			accountName,
			accountType,
			bankName: accountType === "Bank" ? bankName : null, // Only set bankName for bank accounts
			balance,
		};
		const savedSubAccount = await subAccountModel.create(newAccount);

		// Step 2: Check if a MainAccount already exists for this user
		const mainAccount = await mainAccountModel.findOne({
			userId: new ObjectId(userId),
		});

		if (!mainAccount) {
			// Step 3: Create a new MainAccount if none exists
			await mainAccountModel.create({
				userId: new ObjectId(userId),
				totalBalance: balance,
				totalIncome: 0,
				totalExpense: 0,
				currency,
				linkedAccounts: [
					{
						accountId: savedSubAccount._id,
						accountName: savedSubAccount.accountName,
						balance: savedSubAccount.balance,
					},
				],
			});
		} else {
			// Step 4: Add the new sub-account to the existing MainAccount
			mainAccount.linkedAccounts.push({
				accountId: savedSubAccount._id,
				accountName: savedSubAccount.accountName,
				balance: savedSubAccount.balance,
			});
			mainAccount.totalBalance += savedSubAccount.balance;

			// Save the updated main account
			await mainAccount.save();
		}

		// add initial income to the income model
		const income = {
			userId: userId,
			accountId: savedSubAccount._id,
			category: "Initial",
			amount: balance,
			description: "First deposit creation of account",
			date: new Date(),
		};

		const createdIncome = await incomeModel.create(income);
		console.log("Income created:", createdIncome);

		// Step 5: Log the transaction
		await transactionModel.create({
			userId,
			accountId: savedSubAccount._id,
			type: "income", // Treat initial deposit as income
			amount: balance,
			category: "Initial",
			description: "Initial deposit for new account",
			date: new Date(),
		});

		// return new NextResponse("Account has been created", { status: 201 });
		return new NextResponse(
			JSON.stringify({ message: "Account has been created" }),
			{
				status: 201,
				headers: { "Content-Type": "application/json" },
			}
		);
	} catch (error) {
		console.error("Error:", error);
		return new NextResponse(error.message, { status: 500 });
	}
};
