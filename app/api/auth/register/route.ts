import bcrypt from "bcryptjs";
import { userModel } from "@/models/user-model";
import { connectToDatabase } from "@/service/mongo";
import createErrorResponse from "@/lib/createErrorResponse";
import createSuccessResponse from "@/lib/createSuccessResponse";

export const POST = async (request: Request) => {
	const body = await request.json();

	if (!body || typeof body !== "object" || Array.isArray(body)) {
		return createErrorResponse({
			message: "Invalid request format. Please send a valid JSON object",
			status: 400,
		});
	}

	const { name, email, password } = body;

	if (password.length < 6) {
		return createErrorResponse({
			message: "Password must be at least 6 characters",
			status: 400,
		});
	}

	await connectToDatabase();

	let hashedPassword = "";

	if (password) {
		hashedPassword = await bcrypt.hash(password, 5);
	}

	const newUser = {
		name,
		email,
		password: hashedPassword,
	};

	try {
		const user = await userModel.create(newUser);
		return createSuccessResponse({
			message: "User has been created successfully.",
			status: 201,
			data: { id: user._id, name: user.name, email: user.email },
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		// Handle Mongooose validation error
		if (error.name === "ValidationError") {
			const messages = Object.values(error.errors).map(
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(err: any) => err.message
			);
			return createErrorResponse({
				message: messages.join(", "),
				status: 400,
			});
		}

		// Handle duplicate email error (MongoDB unique index violation)
		if (error.code === 11000 && error.keyPattern.email) {
			return createErrorResponse({
				message: "This email address already exists",
				status: 400,
			});
		}

		// Handle other errors (e.g., network errors)
		return createErrorResponse({
			message: "An unexpected error occurred. Please try again later.",
			status: 500,
		});
	}
};
