import { userModel } from "@/models/user-model";
import { connectToDatabase } from "@/service/mongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
	const { name, email, password } = await request.json();

	console.log(name, email, password);

	await connectToDatabase();

	const hashedPassword = await bcrypt.hash(password, 5);

	const newUser = {
		name,
		email,
		password: hashedPassword,
	};

	console.log(newUser);

	try {
		await userModel.create(newUser);
		return new NextResponse("User has been created", {
			status: 201,
		});
	} catch (err) {
		return new NextResponse(err.message, {
			status: 500,
		});
	}
};
