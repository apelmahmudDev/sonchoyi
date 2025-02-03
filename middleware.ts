import { NextRequest } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { LOGIN, PUBLIC_ROUTES, ROOT } from "./lib/routes";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req: NextRequest) {
	const { nextUrl } = req;
	const isAuthenticated = !!req.auth;

	const isPublicRoute =
		PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
		nextUrl.pathname === ROOT;

	if (!isAuthenticated && !isPublicRoute) {
		return Response.redirect(new URL(LOGIN, nextUrl));
	}
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
