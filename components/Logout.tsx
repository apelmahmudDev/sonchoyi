import { doSignOut } from "@/app/actions";
import { LogoutIcon } from "./icon";

const Logout = () => {
	return (
		<form action={doSignOut}>
			<button
				type="submit"
				className="w-full flex items-center gap-2.5 p-4 hover:bg-slate-50 transition"
			>
				<div className="flex items-center justify-center h-[52px] w-[52px] bg-[#EEE5FF] rounded-2xl">
					<LogoutIcon />
				</div>
				<p className="text-base font-medium text-[#292B2D]">Logout</p>
			</button>
		</form>
	);
};

export default Logout;
