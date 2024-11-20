"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { login } from "../actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	const handleAuth = () => {
		signIn("google", { callbackUrl: "http://localhost:3000/profile" });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		try {
			const response = await login({
				email,
				password,
			});
			if (!!response.error) {
				setError(response.error?.message);
			} else {
				router.push("/profile");
			}
		} catch (error) {
			setError(error as string);
		}
	};

	return (
		<div className="p-4">
			<p className="font-semibold text-lg text-center my-5">Login</p>
			<div className="mb-5">
				{error && (
					<p className="text-red-500 text-center text-sm">{error?.message}</p>
				)}
			</div>
			<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
				<Input name="email" type="email" placeholder="Email" />
				<Input name="password" type="password" placeholder="Password" />
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
