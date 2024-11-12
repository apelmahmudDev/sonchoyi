"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";

export default function LoginPage() {
	const handleAuth = (event) => {
		event.preventDefault();
		signIn("google", { callbackUrl: "http://localhost:3000" });
	};
	return (
		<div className="p-4">
			<p className="font-semibold text-lg text-center my-5">Login</p>
			<form className="flex flex-col gap-6" action="">
				<Input type="email" placeholder="Email" />
				<Input type="password" placeholder="Password" />
				<Button type="submit">Login</Button>
			</form>
			<p className="font-semibold text-lg text-center mt-[33px] mb-[38px]">
				Forgot Password?
			</p>
			<div className="flex justify-center">
				<button type="button" onClick={handleAuth} className="mb-5">
					Sign with google
				</button>
			</div>
			<p className="text-center text-[#91919F]">
				Don’t have an account yet?{" "}
				<Link className="text-[#7F3DFF]" href="/signup">
					Sign Up
				</Link>
			</p>
		</div>
	);
}
