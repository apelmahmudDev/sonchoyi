import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ExportUploadIcon, SettingsIcon, WalletIcon } from "@/components/icon";
import BottomNavigation from "@/components/common/BottomNavigation";
import Logout from "@/components/Logout";
import User from "@/components/User";

export default async function ProfilePage() {
	const session = await auth();
	if (!session) {
		redirect("/login");
	}
	return (
		<>
			<div className="h-[calc(100vh-80px)] bg-[#f6f6f6] p-5">
				<User />
				<div className="bg-white rounded-3xl my-10 overflow-hidden">
					<Link href="/account">
						<div className="flex items-center gap-2.5 border-b border-[#000]/5 p-4 hover:bg-slate-50 transition">
							<div className="flex items-center justify-center h-[52px] w-[52px] bg-[#EEE5FF] rounded-2xl">
								<WalletIcon />
							</div>
							<p className="text-base font-medium text-[#292B2D]">Account</p>
						</div>
					</Link>
					<div className="flex items-center gap-2.5 border-b border-[#000]/5 p-4 hover:bg-slate-50 transition">
						<div className="flex items-center justify-center h-[52px] w-[52px] bg-[#EEE5FF] rounded-2xl">
							<SettingsIcon />
						</div>
						<p className="text-base font-medium text-[#292B2D]">Settings</p>
					</div>
					<div className="flex items-center gap-2.5 border-b border-[#000]/5 p-4 hover:bg-slate-50 transition">
						<div className="flex items-center justify-center h-[52px] w-[52px] bg-[#EEE5FF] rounded-2xl">
							<ExportUploadIcon />
						</div>
						<p className="text-base font-medium text-[#292B2D]">Export Data</p>
					</div>
					<Logout />
				</div>
			</div>
			<BottomNavigation />
		</>
	);
}
