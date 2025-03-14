import { userModel } from "@/models/user-model";
import { mainAccountModel } from "@/models/main-account";
import { ObjectId } from "mongodb";
// import { transactionModel } from "@/models/transactions-model";
import { subAccountModel } from "@/models/sub-account-model";
import { transformResponse } from "@/lib/api-utils";

export async function getUserByEmail(email: string) {
	try {
		if (!email || typeof email !== "string") {
			throw new Error("Invalid email address provided.");
		}

		const user = await userModel.findOne({ email }).lean();

		if (!user) {
			return null;
		}

		return transformResponse(user);
	} catch {
		throw new Error("Failed to retrieve user.");
	}
}

export async function getMainAccountByUserId(userId: string) {
	try {
		const userIdObj = new ObjectId(userId);
		const account = await mainAccountModel
			.findOne({ userId: userIdObj })
			.lean();
		if (account) {
			return transformResponse(account);
		} else {
			return null;
		}
	} catch (error) {
		console.error("Error fetching main account:", error);
	}
}

export async function getSubAccountsByUserId(userId: string) {
	try {
		const userIdObj = new ObjectId(userId);
		const accounts = await subAccountModel.find({ userId: userIdObj }).lean();
		return transformResponse(accounts);
	} catch (error) {
		console.error("Error fetching sub accounts:", error);
	}
}

// export async function getTransactionsByUserId(userId: string) {
// 	try {
// 		const userIdObj = new ObjectId(userId);
// 		const transactions = await transactionModel
// 			.find({ userId: userIdObj })
// 			.lean();
// 		return replaceMongoIdInArray(transactions);
// 	} catch (error) {
// 		console.error("Error fetching transactions:", error);
// 	}
// }
