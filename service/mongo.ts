import mongoose from "mongoose";

export async function connectToDatabase() {
	try {
		const connect = await mongoose.connect(
			String(process.env.MONGO_CONNECTION_STRING),
			{
				dbName: "sonchoyi", // ✅ Ensure it uses the "sonchoyi" database
			}
		);
		console.log("Connected to MongoDB - sonchoyi database");
		return connect;
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
}
