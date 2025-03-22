import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/service/mongo";
import { subAccountModel } from "@/models/sub-account-model";
import createErrorResponse from "@/lib/createErrorResponse";
import createSuccessResponse from "@/lib/createSuccessResponse";
import { transformResponse } from "@/lib/api-utils";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const userId = searchParams.get("userId");

		if (!userId) {
			return createErrorResponse({
				message: "User ID is required.",
				status: 400,
			});
		}

		await connectToDatabase();

		// Convert userId to ObjectId
		const userIdObj = new ObjectId(userId);

		const accounts = await subAccountModel.find({ userId: userIdObj }).lean();

		return createSuccessResponse({
			status: 200,
			data: transformResponse(accounts),
		});
	} catch {
		return createErrorResponse({
			message: "Failed to fetch sub-accounts.",
			status: 500,
		});
	}
}
