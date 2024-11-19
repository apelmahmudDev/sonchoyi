"use server";

import { signOut } from "@/auth";

export async function doSignOut() {
	await signOut({ redirectTo: "/" });
}
