import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { userModel } from "./models/user-model";
import client from "./lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
	adapter: MongoDBAdapter(client, { databaseName: process.env.ENVIRONMENT }),
	session: {
		strategy: "jwt",
	},
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				let user = null;
				if (credentials === null) return user;
				try {
					user = await userModel.findOne({ email: credentials.email });
					if (user) {
						const isMatch =
							user.email === credentials.email &&
							user.password === credentials.password;
						if (isMatch) {
							return user;
						} else {
							throw new Error("Email or password is incorrect.");
						}
					} else {
						throw new Error("No user found");
					}
				} catch {
					throw new Error("Invalid credentials.");
				}
				return user;
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
});
