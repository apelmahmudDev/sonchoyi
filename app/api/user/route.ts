import { userModel } from "@/models/user-model";
import { connectToDatabase } from "@/service/mongo";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
	// Parse the email from the query string
	const { searchParams } = new URL(request.url);
	const email = searchParams.get("email");

	// Validate email presence
	if (!email) {
		return new NextResponse("Email is required", { status: 400 });
	}

	console.log("Fetching user with email:", email);

	try {
		// Connect to the database
		await connectToDatabase();

		// Fetch user from the database
		const user = await userModel.findOne({ email }).lean();

		// If no user is found
		if (!user) {
			return new NextResponse("User not found", { status: 404 });
		}

		// Process and return the user data (excluding sensitive info like password)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...userWithoutPassword } = user;

		return NextResponse.json(userWithoutPassword, { status: 200 });
	} catch (error) {
		console.error("Error fetching user:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
};
