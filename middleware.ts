import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

// 1. Specify protected and public routes
const protectedRoutes = ["/username"];
const publicRoutes = ["/login", "/signup", "/"];

const { auth } = NextAuth(authConfig);

export default auth((req) => {
	// 2. Check is user authenticated
	const isAuthenticated = !!req.auth;

	// 3. Check if the current route is protected or public
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);
	const isPublicRoute = publicRoutes.includes(path);

	// 4. Redirect to /login if the user is not authenticated
	if (isProtectedRoute && !isAuthenticated) {
		return NextResponse.redirect(new URL("/login", req.nextUrl));
	}

	// 5. Redirect to /dashboard if the user is authenticated
	// if (
	// 	isPublicRoute &&
	// 	isAuthenticated &&
	// 	!req.nextUrl.pathname.startsWith("/dashboard")
	// ) {
	// 	return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
	// }

	if (
		isPublicRoute &&
		isAuthenticated &&
		req.nextUrl.pathname.startsWith("/login")
	) {
		return NextResponse.redirect(new URL("/", req.nextUrl));
	}

	return NextResponse.next();
});

// Routes Middleware should not run on
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
