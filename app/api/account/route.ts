import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/service/mongo";
import { mainAccountModel } from "@/models/main-account";
import { subAccountModel } from "@/models/sub-account-model";
import { incomeModel } from "@/models/income-model";
import { transactionModel } from "@/models/transactions-model";
import createErrorResponse from "@/lib/createErrorResponse";
import createSuccessResponse from "@/lib/createSuccessResponse";

export const POST = async (request: Request) => {
	try {
		const {
			userId,
			accountName,
			accountType,
			bankName,
			balance: balanceAmount,
			currency = "USD",
		} = await request.json();

		// Convert balance safely
		const balance = parseFloat(balanceAmount);

		// Validate balance (ensure it's a number and not NaN)
		if (isNaN(balance) || balance < 0) {
			return createErrorResponse({
				message: "Invalid balance. Please enter a valid positive amount.",
				status: 400,
			});
		}

		// Ensure database connection
		await connectToDatabase();

		const missingFields = [];
		if (!userId) missingFields.push("userId");
		if (!accountName) missingFields.push("accountName");
		if (!accountType) missingFields.push("accountType");
		if (balance === undefined || balance === null)
			missingFields.push("balance");

		if (missingFields.length > 0) {
			const formattedFields = missingFields.join(", ");
			const message =
				missingFields.length === 1
					? `Please provide the missing field: ${formattedFields}.`
					: `Please provide the missing fields: ${formattedFields}.`;

			return createErrorResponse({ message });
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
				totalIncome: balance,
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

		// add initial income to the income model of balance greater than 0
		const income = {
			userId: userId,
			accountId: savedSubAccount._id,
			category: "Initial",
			amount: balance,
			description: "First deposit creation of account",
			date: new Date(),
		};
		await incomeModel.create(income);

		// Step 5: Log the transaction
		if (balance > 0) {
			await transactionModel.create({
				userId,
				accountId: savedSubAccount._id,
				type: "income", // Treat initial deposit as income
				amount: balance,
				category: "Initial",
				description: "Initial deposit for new account",
				date: new Date(),
			});
		}

		return createSuccessResponse({
			message: "Account has been created",
			status: 201,
		});
	} catch {
		return createErrorResponse({
			message: "An unexpected error occurred. Please try again later.",
			status: 500,
		});
	}
};
