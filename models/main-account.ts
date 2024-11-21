import mongoose, { Schema } from "mongoose";

const mainAccountSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		income: {
			type: Number,
			required: true,
			default: 0,
		},
		totalBalance: {
			type: Number,
			required: true,
			default: 0,
		},
		totalIncome: {
			type: Number,
			required: true,
			default: 0,
		},
		totalExpense: {
			type: Number,
			required: true,
			default: 0,
		},
		currency: {
			type: String,
			required: true,
			default: "USD",
			maxlength: 3,
		},
		linkedAccounts: [
			{
				accountId: {
					type: Schema.Types.ObjectId,
					ref: "Account",
				},
				accountName: {
					type: String,
					required: true,
				},
				balance: {
					type: Number,
					required: true,
					default: 0,
				},
			},
		],
	},
	{
		timestamps: true, // Automatically add createdAt and updatedAt
	}
);

export const mainAccountModel =
	mongoose.models.mainAccount ??
	mongoose.model("mainAccount", mainAccountSchema);
