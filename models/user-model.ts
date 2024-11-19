import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 100,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [
				/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
				"Please enter a valid email address",
			],
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
		},
		image: {
			type: String,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

export const userModel =
	mongoose.models.users ?? mongoose.model("users", userSchema);
