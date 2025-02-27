import mongoose from "mongoose";

export async function connectToDatabase() {
	try {
		const connect = await mongoose.connect(
			String(process.env.MONGO_CONNECTION_STRING),
			{
				dbName: "fundwave", // ✅ Ensure it uses the "fundwave" database
			}
		);
		console.log("Connected to MongoDB - fundwave database");
		return connect;
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
}
