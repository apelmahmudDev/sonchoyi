"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { login } from "../../actions";
import { useRouter } from "next/navigation";
import ManImg from "@/assets/images/man.png";
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
import Image from "next/image";
import { EyeIcon, EyeSlashIcon, GoogleIcon } from "@/components/icon";
import Navigation from "@/components/common/Navigation";

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
		<div className="h-screen">
			<div className="h-full container">
				<Link href="/">
					<span className="text-lg font-semibold">Fundwave</span>
				</Link>
				<div className="h-full flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-[100px]">
					<div className="relative lg:max-w-[629px] w-full">
						<h1 className="mt-10 lg:mt-0 font-semibold text-[26px] md:text-[42px] xl:text-[50px]">
							{/* Welcome back! */} Sign in to
						</h1>
						<h2 className="font-medium text-lg md:text-2xl xl:text-[35px]">
							Manage your money
						</h2>
						<p className="mt-8 lg:mt-[43px] mb-1.5 z-10 text-sm md:text-base">
							If you don’t have an account register
						</p>
						<p className="text-sm md:text-base">
							You can{" "}
							<Link href="/signup">
								<button className="text-primary font-semibold text-sm md:text-base">
									Register here !
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
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-9"
							>
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
													type="password"
													placeholder="Password"
													endAdornment={
														<button type="button">
															<EyeIcon />
															{/* <EyeSlashIcon /> */}
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
								<Button className="w-full h-[54px]" type="submit">
									Sign in
								</Button>
							</form>
						</Form>
						<p className="text-center text-gray-500 my-8">OR</p>
						<div>
							<button className="w-full h-[54px] flex items-center gap-5 justify-center bg-[#FFF4E3] hover:bg-[#faeedb] rounded-md px-8 text-[#B87514] text-base font-normal transition-colors">
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
