import mongoose, { Schema } from "mongoose";

const subAccountSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		accountName: {
			type: String,
			required: true,
			unique: true,
			maxlength: 100,
		},
		accountType: {
			type: String,
			required: true,
			enum: ["Bank", "Credit Card", "Cash", "Wallet"], // Define account types
		},
		bankName: {
			type: String, // Only applicable if accountType is "Bank"
			enum: ["IBBL", "DBBL", "Sonali Bank", "HSBC", "City Bank", "Other"], // Define bank options
		},
		balance: {
			type: Number,
			default: 0, // Default balance is 0
			required: true,
		},
	},
	{
		timestamps: true, // Automatically add createdAt and updatedAt
	}
);

export const subAccountModel =
	mongoose.models.subAccount ?? mongoose.model("subAccount", subAccountSchema);
