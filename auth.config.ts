// NextAuthOptions is renamed to NextAuthConfig

// import { NextAuthOptions } from "next-auth";
import { NextAuthConfig } from "next-auth";

// const authOptions: NextAuthOptions = {
const authOptions: NextAuthConfig = {
	session: {
		strategy: "jwt",
	},
	providers: [],
};

export default authOptions;
