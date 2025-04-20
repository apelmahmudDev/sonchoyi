"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { login } from "../../../actions";
import { useRouter } from "next/navigation";
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
	InfoIcon,
	LoaderIcon,
} from "@/components/icon";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
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

export const LoginForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
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
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			setIsLoading(true);
			const response = await login({
				email: values.email,
				password: values.password as string,
			});
			if (!!response.error) {
				setError(response?.error);
			} else {
				router.push("/my-wallet");
			}
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			setError(error as Error);
		}
	}

	return (
		<div>
			<div className="space-y-6 mb-6">
				{/* demo email & pass */}
				<div className="w-full bg-[#CAFDF5] dark:bg-[#003768] p-[13px] rounded-md flex gap-2.5 items-start">
					<InfoIcon className="text-[#00b8d9] dark:text-[#CAFDF5] flex-shrink-0" />
					<p className="text-sm text-[#003768] dark:text-[#CAFDF5] pt-[1.2px]">
						Use <strong>demo@shonchoyi.com</strong> with password{" "}
						<strong>demo1234</strong>
					</p>
				</div>
				{/* error */}
				{error && (
					<div className="w-full bg-[#FFE9D5] dark:bg-[#7A0916] p-[13px] rounded-md flex gap-2.5 items-start">
						<ErrorIcon className="text-[#ff5630] dark:text-[#ffAC82] flex-shrink-0" />
						<p className="text-sm pt-0.5 text-[#7A0916] dark:text-[#ffAC82]">
							{error?.message}
						</p>
					</div>
				)}
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
					<div>
						<div className="justify-end flex mb-2">
							<button
								type="button"
								className="text-right text-[13px] cursor-pointer border-0 outline-0 ring-0 hover:underline hover:underline-offset-1"
							>
								Forgot password ?
							</button>
						</div>
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
					</div>
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
						Sign in
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
