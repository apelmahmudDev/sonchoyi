import { userModel } from "@/models/user-model";
import { mainAccountModel } from "@/models/main-account";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/data-util";
import { ObjectId } from "mongodb";
import { transactionModel } from "@/models/transactions-model";

export async function getUserByEmail(email: string) {
	const users = await userModel.find({ email: email }).lean();
	return replaceMongoIdInObject(users[0]);
}

export async function getMainAccountByUserId(userId: string) {
	try {
		const userIdObj = new ObjectId(userId);
		const account = await mainAccountModel
			.findOne({ userId: userIdObj })
			.lean();
		if (account) {
			return replaceMongoIdInObject(account);
		} else {
			return null;
		}
	} catch (error) {
		console.error("Error fetching main account:", error);
	}
}

export async function getTransactionsByUserId(userId: string) {
	try {
		const userIdObj = new ObjectId(userId);
		const transactions = await transactionModel
			.find({ userId: userIdObj })
			.lean();
		return replaceMongoIdInArray(transactions);
	} catch (error) {
		console.error("Error fetching transactions:", error);
	}
}
