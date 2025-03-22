import createErrorResponse from "@/lib/createErrorResponse";
import createSuccessResponse from "@/lib/createSuccessResponse";
import { connectToDatabase } from "@/service/mongo";
import { userModel } from "@/models/user-model";
import { transformResponse } from "@/lib/api-utils";

export const GET = async (request: Request) => {
	const { searchParams } = new URL(request.url);
	const email = searchParams.get("email");

	if (!email) {
		return createErrorResponse({
			message: "Email is required",
			status: 400,
		});
	}

	try {
		await connectToDatabase();

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const user: any = await userModel.findOne({ email }).lean();

		if (!user) {
			return createErrorResponse({
				message: "User not found",
				status: 404,
			});
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...userWithoutPassword } = user;

		return createSuccessResponse({
			status: 200,
			data: transformResponse(userWithoutPassword),
		});
	} catch {
		return createErrorResponse({
			message: "Internal Server Error",
			status: 500,
		});
	}
};
