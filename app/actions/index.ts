"use server";

import { signOut, signIn } from "@/auth";

export async function doSignOut() {
	await signOut({ redirectTo: "/" });
}

export async function login(formData: { email: string; password: string }) {
	try {
		const response = await signIn("credentials", {
			redirect: false,
			email: formData.email,
			password: formData.password,
		});
		return response;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		// Handle CredentialsSignin wrapped in CallbackRouteError
		if (error?.type === "CredentialsSignin") {
			throw new Error("Invalid email or password.");
		}

		// Unknown errors
		throw new Error("Something went wrong. Please try again later.");
	}
}
