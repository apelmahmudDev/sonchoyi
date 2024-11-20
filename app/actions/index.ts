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
	} catch (error) {
		throw new Error(String(error));
	}
}
