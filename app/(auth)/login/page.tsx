"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { login } from "../../actions";
import { useRouter } from "next/navigation";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	email: z.string().email({ message: "Invalid email address." }),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
});

export default function LoginPage() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleAuth = () => {
		signIn("google", { callbackUrl: "http://localhost:3000/letsgo" });
	};

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const response = await login({
				email: values.email,
				password: values.password,
			});
			if (!!response.error) {
				setError(response?.error);
			} else {
				router.push("/letsgo");
			}
		} catch (error) {
			setError(error as string);
		}
	}

	return (
		<div className="p-4">
			<p className="font-semibold text-lg text-center my-5">Login</p>
			<div className="mb-5">
				{error && (
					<p className="text-red-500 text-center text-sm">{error?.message}</p>
				)}
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input type="text" placeholder="Email " {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input type="password" placeholder="Password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Login</Button>
				</form>
			</Form>
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
