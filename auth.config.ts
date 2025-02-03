import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export default {
	session: {
		strategy: "jwt",
	},
	providers: [Google],
} satisfies NextAuthConfig;
