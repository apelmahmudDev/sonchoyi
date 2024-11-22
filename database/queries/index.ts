import { userModel } from "@/models/user-model";
import { mainAccountModel } from "@/models/main-account";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/data-util";
import { ObjectId } from "mongodb";

export async function getAllUsers() {
	const users = await userModel.find().lean();

	return replaceMongoIdInArray(users);
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
