import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Carousel } from "@/components/home";

export default async function Home() {
	const session = await auth();
	if (session?.user) return redirect("/account");
	return <Carousel />;
}
