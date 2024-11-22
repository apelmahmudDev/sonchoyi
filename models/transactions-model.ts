import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
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
		type: {
			type: String,
			enum: ["income", "expense", "transfer"], // The nature of the transaction
			required: true,
		},
		amount: {
			type: Number,
			required: true,
			min: 0,
		},
		category: {
			type: String,
			required: function () {
				return this.type !== "transfer";
			}, // Category is only required for income/expense
		},
		fromAccountId: {
			type: Schema.Types.ObjectId,
			ref: "Account",
			required: function () {
				return this.type === "transfer";
			}, // Required for transfers
		},
		toAccountId: {
			type: Schema.Types.ObjectId,
			ref: "Account",
			required: function () {
				return this.type === "transfer";
			}, // Required for transfers
		},
		description: {
			type: String,
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

export const transactionModel =
	mongoose.models.Transaction ??
	mongoose.model("Transaction", transactionSchema);
