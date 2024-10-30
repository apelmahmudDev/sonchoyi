import Link from "next/link";
import { Button } from "@/components/Button";
import { Input } from "@/components/ui/Input";

export default function SignUpPage() {
	return (
		<div className="p-4">
			<p className="font-semibold text-lg text-center my-5">Sign Up</p>
			<form className="flex flex-col gap-6" action="">
				<Input type="text" placeholder="Name" />
				<Input type="email" placeholder="Email" />
				<Input type="password" placeholder="Password" />
				<Button type="submit">Login</Button>
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
