import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		accountId: {
			type: Schema.Types.ObjectId,
			ref: "Account",
			required: true,
		},
		category: {
			type: String,
			required: true,
			enum: [
				"Food",
				"Rent",
				"Utilities",
				"Transportation",
				"Entertainment",
				"Healthcare",
				"Education",
				"Shopping",
				"Travel",
				"Other",
			],
			default: "Other",
		},
		amount: {
			type: Number,
			required: true,
			min: 0,
		},
		description: {
			type: String,
			maxlength: 500,
		},
		attachment: {
			type: String,
		},
		repeat: {
			frequency: {
				type: String,
				enum: ["daily", "weekly", "monthly", "yearly"],
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

export const expenseModel =
	mongoose.models.expense ?? mongoose.model("expense", expenseSchema);
