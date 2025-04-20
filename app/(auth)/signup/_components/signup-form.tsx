"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormItem,
	FormField,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import {
	ErrorIcon,
	EyeIcon,
	EyeSlashIcon,
	GoogleIcon,
	LoaderIcon,
} from "@/components/icon";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
	name: z
		.string({ required_error: "Name is required!" })
		.min(1, "Name is required!")
		.min(2, "Name must be at least 2 characters.!"),
	email: z
		.string({ required_error: "Email is required!" })
		.min(1, "Email is required!")
		.email("Email must be a valid email address!"),
	password: z
		.string({ required_error: "Password is required!" })
		.min(1, "Password is required!")
		.min(6, "Password must be more than 6 characters!")
		.max(32, "Password must be less than 32 characters!"),
});

export const SignupForm = () => {
	const router = useRouter();
	const [error, setError] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

	const handlePasswordVisibility = () => {
		setIsVisiblePassword((prev) => !prev);
	};

	const signWithGoogle = () => {
		signIn("google", {
			callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/my-wallet`,
		});
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
			setIsLoading(true);
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

			const data = await res.json();

			if (res.status === 201) {
				toast.success("User has been created successfully.");
				router.push("/login");
			} else {
				setError(data.message || "Something went wrong.");
			}
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			setError(error as string);
		}
	}

	return (
		<div>
			<div className="space-y-6 mb-6">
				{error && (
					<div className="w-full bg-[#FFE9D5] dark:bg-[#7A0916] p-[13px] rounded-md flex gap-2.5 items-start">
						<ErrorIcon className="text-[#ff5630] dark:text-[#ffAC82] flex-shrink-0" />
						<p className="text-sm pt-0.5 text-[#7A0916] dark:text-[#ffAC82]">
							{error}
						</p>
					</div>
				)}
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className="h-[54px]"
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
										className="h-[54px]"
										type="text"
										autoComplete="email"
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
										className="h-[54px]"
										type={isVisiblePassword ? "text" : "password"}
										autoComplete="current-password"
										placeholder="6+ characters"
										endAdornment={
											<button
												className="cursor-pointer"
												onClick={handlePasswordVisibility}
												type="button"
											>
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

					<Button
						disabled={isLoading}
						className="w-full h-[50px] font-semibold"
						type="submit"
					>
						{isLoading && (
							<span className="animate-spin">
								<LoaderIcon />
							</span>
						)}
						Create an account
					</Button>
				</form>
			</Form>
			<div className="my-5  flex flex-shrink items-center justify-center gap-2">
				<div className="grow basis-0 border-b text-gray-500" />
				<span className="font-normal text-sm uppercase leading-none text-gray-500">
					or
				</span>
				<div className="grow basis-0 border-b text-gray-500" />
			</div>
			<div>
				<Button
					onClick={signWithGoogle}
					className="w-full h-[50px] flex items-center gap-4 justify-center bg-[#FFE9D5] hover:bg-[#faeedb] px-8 text-[#B87514] font-semibold transition-colors"
				>
					<GoogleIcon />
					<span>Continue with Google</span>
				</Button>
			</div>
		</div>
	);
};
