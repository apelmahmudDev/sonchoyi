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
	EyeIcon,
	EyeSlashIcon,
	GoogleIcon,
	LoaderIcon,
} from "@/components/icon";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
	email: z.string().email({ message: "Invalid email address." }),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
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
		signIn("google", { callbackUrl: "http://localhost:3000/my-wallet" });
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
			setError(null);
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
		<div className="lg:max-w-sm w-full pb-10 lg:pb-0">
			<h3 className="hidden lg:flex font-medium text-3xl mb-7">Sign in</h3>
			<div className="mb-5">
				{error && (
					<p className="text-red-500 text-left text-sm">{error?.message}</p>
				)}
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className="bg-[#F0EFFF]"
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
										className="bg-[#F0EFFF]"
										type={isVisiblePassword ? "text" : "password"}
										autoComplete="current-password"
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
					<div className="justify-end flex">
						<button
							type="button"
							className="-mt-6 text-right text-gray-500 text-[13px]"
						>
							Forgot password ?
						</button>
					</div>
					<Button
						disabled={isLoading}
						className="w-full h-[54px]"
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
			<div className="my-8 flex flex-shrink items-center justify-center gap-2">
				<div className="grow basis-0 border-b text-gray-500" />
				<span className="font-normal uppercase leading-none text-gray-500">
					or
				</span>
				<div className="grow basis-0 border-b text-gray-500" />
			</div>
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
