import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function LetsGoPage() {
	return (
		<div className="p-4">
			<p className="font-medium text-4xl my-5">Let’s setup your account!</p>
			<p className="my-[37px]">
				Account can be your bank, credit card or your wallet.
			</p>
			<Link href="/account/add">
				<Button className="w-full">{"Let's go"}</Button>
			</Link>
		</div>
	);
}
