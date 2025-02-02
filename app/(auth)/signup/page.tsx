"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";
import ManImg from "@/assets/images/man.png";
import { EyeIcon, EyeSlashIcon, GoogleIcon } from "@/components/icon";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	email: z.string().email({ message: "Invalid email address." }),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
});

export default function SignUpPage() {
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
		<div className="h-screen">
			<div className="h-full container">
				<Link href="/">
					<span className="text-lg font-semibold">Fundwave</span>
				</Link>
				<div className="h-full flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-[100px]">
					<div className="relative lg:max-w-[629px] w-full">
						<h1 className="mt-10 lg:mt-0 font-semibold text-[26px] md:text-[42px] xl:text-[50px]">
							Sign Up to
						</h1>
						<h2 className="font-medium text-lg md:text-2xl xl:text-[35px]">
							Manage your money
						</h2>
						<p className="mt-8 lg:mt-[43px] mb-1.5 z-10 text-sm md:text-base">
							If you already have an account
						</p>
						<p className="text-sm md:text-base">
							You can{" "}
							<Link href="/login">
								<button className="text-primary font-semibold text-sm md:text-base">
									Login here !
								</button>
							</Link>
						</p>
						<Image
							className="hidden lg:flex w-[300px] absolute mt-28 xl:mt-20 right-0 top-0 bottom-0 -z-10"
							src={ManImg}
							alt="man"
						/>
					</div>
					<div className="lg:max-w-sm w-full pb-10 lg:pb-0">
						<h3 className="hidden lg:flex font-medium text-3xl mb-7">
							Sign in
						</h3>
						<div className="mb-5">
							{error && (
								<p className="text-red-500 text-left text-sm">
									{error?.message}
								</p>
							)}
						</div>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-5"
							>
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
														<button
															onClick={handlePasswordVisibility}
															type="button"
														>
															{isVisiblePassword ? (
																<EyeIcon />
															) : (
																<EyeSlashIcon />
															)}
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
				</div>
			</div>
		</div>
	);
}
