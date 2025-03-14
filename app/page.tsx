
import { auth } from "@/auth";
import { doSignOut } from "./actions";


export default async function Home() {
	const session = await auth();

	console.log('session',session);

	return (
		<div
			className="relative h-screen bg-cover bg-center p-10"
			
		>
			<form action={doSignOut}>
			<button
				type="submit"
				className="w-full flex items-center gap-2.5 p-4 hover:bg-slate-50 transition"
			>
				<p className="text-base font-medium text-[#292B2D]">Logout</p>
			</button>
		</form>
			
			
		</div>
	);
}
