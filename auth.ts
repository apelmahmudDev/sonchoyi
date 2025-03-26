import NextAuth from "next-auth";
import authConfig from "./auth.config";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { userModel } from "./models/user-model";
import bcrypt from "bcryptjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function refreshAccessToken(token: any) {
	try {
		const response = await fetch("https://oauth2.googleapis.com/token", {
			method: "POST",
			body: new URLSearchParams({
				client_id: process.env.AUTH_GOOGLE_ID!,
				client_secret: process.env.AUTH_GOOGLE_SECRET!,
				grant_type: "refresh_token",
				refresh_token: token,
			}),
		});

		const refreshedTokens = await response.json();

		if (!response.ok) {
			throw refreshedTokens;
		}

		return {
			...token,
			accessToken: refreshedTokens?.access_token,
			accessTokenExpires: refreshedTokens?.expires_in
				? Date.now() + refreshedTokens.expires_in * 1000
				: undefined,
			refreshToken: refreshedTokens?.refresh_token,
		};
	} catch (error) {
		console.log(error);
		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
}

export const { auth, handlers, signIn, signOut } = NextAuth({
	...authConfig,
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
						const password = credentials.password as string;
						const isMatch = await bcrypt.compare(password, user.password);
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
	callbacks: {
		async jwt({ token, user, account }) {
			console.log(`jwt token: ${JSON.stringify(token)}`);
			console.log(`jwt token: ${JSON.stringify(account)}`);

			if (account && user) {
				return {
					accessToken: account?.access_token,
					accessTokenExpires: account?.expires_in
						? Date.now() + account.expires_in * 1000
						: undefined,
					refreshToken: account?.refresh_token,
					user,
				};
			}

			console.log(`Token will expire at ${new Date(token.accessTokenExpires)}`);
			if (Date.now() < token.accessTokenExpires) {
				console.log(`At ${new Date(Date.now())}, Using old access token`);
				return token;
			}

			// if (
			// 	token.accessTokenExpires &&
			// 	typeof token.accessTokenExpires === "number" &&
			// 	Date.now() < token.accessTokenExpires
			// ) {
			// 	return token;
			// }

			console.log(`Token Expire at: ${new Date(Date.now())}`);
			return refreshAccessToken(token);
		},

		async session({ session, token }) {
			session.user = token?.user;
			session.accessToken = token?.accessToken;
			session.error = token?.error;

			console.log(`Returning session`, JSON.stringify(session));
			return session;
		},
	},
});
