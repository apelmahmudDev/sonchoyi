import NextAuth from "next-auth";
import authConfig from "./auth.config";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { userModel } from "./models/user-model";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./service/mongo";

export const { auth, handlers, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				await connectToDatabase();

				let user = null;
				if (credentials === null) return user;
				try {
					user = await userModel.findOne({ email: credentials.email });
					if (user) {
						const password = credentials.password as string;
						const isMatch = await bcrypt.compare(password, user.password);
						if (isMatch) {
							return user;
						} else {
							return null;
						}
					} else {
						return null;
					}
				} catch (error) {
					throw error;
				}
			},
		}),
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	pages: {
		signIn: "/login",
		error: "/login",
	},
	callbacks: {
		async signIn({ user, account, profile }) {
			await connectToDatabase();

			if (account?.provider === "google") {
				try {
					const existingUser = await userModel.findOne({ email: user.email });

					if (!existingUser) {
						// Use Google profile ID as the password
						const rawPassword = profile?.sub || user.id;
						const hashedPassword = await bcrypt.hash(rawPassword!, 10);

						await userModel.create({
							email: user.email,
							name: user.name,
							image: user.image,
							password: hashedPassword,
						});
					}
				} catch {
					return false;
				}
			}

			return true;
		},
	},
});
