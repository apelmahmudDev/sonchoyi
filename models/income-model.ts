import mongoose, { Schema } from "mongoose";

const incomeSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User", // Reference to the User model
			required: true,
		},
		accountId: {
			type: Schema.Types.ObjectId,
			ref: "Account", // Reference to the Account model
			required: true,
		},
		category: {
			type: String,
			required: true,
			enum: [
				"Initial",
				"Salary",
				"Business Income",
				"Investments",
				"Freelance",
				"Rental Income",
				"Dividends",
				"Royalties",
				"Other",
			],
			default: "Other",
		},
		amount: {
			type: Number,
			required: true,
			min: 0, // Ensure no negative amounts
		},
		description: {
			type: String,
			maxlength: 500, // Limit description length
		},
		attachment: {
			type: String, // File URL or path
		},
		repeat: {
			frequency: {
				type: String,
				enum: ["daily", "weekly", "monthly", "yearly"], // Recurrence options
			},
			endDate: {
				type: Date,
			},
		},
		date: {
			type: Date,
			required: true,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

export const incomeModel =
	mongoose.models.income ?? mongoose.model("income", incomeSchema);
