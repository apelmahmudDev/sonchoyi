"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormItem,
	FormField,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { EyeIcon, EyeSlashIcon, GoogleIcon } from "@/components/icon";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	email: z.string().email({ message: "Invalid email address." }),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
});

export const SignupForm = () => {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

	const handlePasswordVisibility = () => {
		setIsVisiblePassword((prev) => !prev);
	};

	const signWithGoogle = () => {
		signIn("google", { callbackUrl: "http://localhost:3000/letsgo" });
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: values.name,
					email: values.email,
					password: values.password,
				}),
			});
			if (res.status === 201) {
				router.push("/login");
			} else {
				setError({
					message: "There were somethings error",
				});
			}
		} catch (error) {
			setError(error as string);
		}
	}

	return (
		<div className="lg:max-w-sm w-full pb-10 lg:pb-0">
			<h3 className="hidden lg:flex font-medium text-3xl mb-7">Sign in</h3>
			<div className="mb-5">
				{error && (
					<p className="text-red-500 text-left text-sm">{error?.message}</p>
				)}
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className="bg-[#F0EFFF]"
										type="text"
										placeholder="Name "
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className="bg-[#F0EFFF]"
										type="text"
										placeholder="Email "
										{...field}
									/>
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
									<Input
										className="bg-[#F0EFFF]"
										type={isVisiblePassword ? "text" : "password"}
										placeholder="Password"
										endAdornment={
											<button onClick={handlePasswordVisibility} type="button">
												{isVisiblePassword ? <EyeIcon /> : <EyeSlashIcon />}
											</button>
										}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className="w-full h-[54px]" type="submit">
						Sign in
					</Button>
				</form>
			</Form>
			<p className="text-center text-gray-500 my-8">OR</p>
			<div>
				<button
					onClick={signWithGoogle}
					className="w-full h-[54px] flex items-center gap-5 justify-center bg-[#FFF4E3] hover:bg-[#faeedb] rounded-md px-8 text-[#B87514] text-base font-normal transition-colors"
				>
					<GoogleIcon />
					<span>Sign in with Google</span>
				</button>
			</div>
		</div>
	);
};
