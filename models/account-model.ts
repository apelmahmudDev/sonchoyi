import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		accountName: {
			type: String,
			required: true,
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
		currency: {
			type: String,
			required: true,
			default: "USD", // Default currency
			maxlength: 3, // ISO currency codes like USD, EUR
		},
	},
	{
		timestamps: true, // Automatically add createdAt and updatedAt
	}
);

export const accountModel =
	mongoose.models.account ?? mongoose.model("account", accountSchema);
