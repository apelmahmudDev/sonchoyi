"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const formData = new FormData(e.currentTarget);
			const name = formData.get("name");
			const email = formData.get("email");
			const password = formData.get("password");

			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			});
			if (res.status === 201) {
				router.push("/login");
			}
		} catch (error) {
			setError(error as string);
		}
	};

	return (
		<div className="p-4">
			<p className="font-semibold text-lg text-center my-5">Sign Up</p>
			<div className="mb-5">
				{error && (
					<p className="text-red-500 text-center text-sm">{error?.message}</p>
				)}
			</div>
			<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
				<Input name="name" type="text" placeholder="Name" />
				<Input name="email" type="email" placeholder="Email" />
				<Input name="password" type="password" placeholder="Password" />
				<Button type="submit">Sign In</Button>
			</form>
			<p className="font-semibold text-lg text-center mt-[33px] mb-[38px]">
				Sign Up with Google
			</p>
			<p className="text-center text-[#91919F]">
				Already have an account?{" "}
				<Link className="text-[#7F3DFF]" href="/login">
					Login
				</Link>
			</p>
		</div>
	);
}
