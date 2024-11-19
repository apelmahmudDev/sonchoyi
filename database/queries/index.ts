import { userModel } from "@/models/user-model";
import { replaceMongoIdInArray } from "@/lib/data-util";

export async function getAllUsers() {
	const users = await userModel.find().lean();

	return replaceMongoIdInArray(users);
}
