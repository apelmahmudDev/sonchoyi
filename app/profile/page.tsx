import AvatarImg from "@/assets/images/avatar.jpg";
import BottomNavigation from "@/components/common/BottomNavigation";
import {
	EditIcon,
	ExportUploadIcon,
	LogoutIcon,
	SettingsIcon,
	WalletIcon,
} from "@/components/icon";
import Avatar from "@/components/ui/avatar";
import Link from "next/link";

export default function ProfilePage() {
	return (
		<>
			<div className="h-[calc(100vh-80px)] bg-[#f6f6f6] p-5">
				<div className="flex items-center gap-5">
					<Avatar source={AvatarImg} className="h-[80px] w-[80px]" />
					<div className="flex-1">
						<p className="text-[#91919F] text-sm font-medium mb-2">Username</p>
						<p className="text-[#161719] text-2xl font-semibold">
							Iriana Saliha
						</p>
					</div>
					<button>
						<EditIcon />
					</button>
				</div>
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
					<div className="flex items-center gap-2.5 p-4 hover:bg-slate-50 transition">
						<div className="flex items-center justify-center h-[52px] w-[52px] bg-[#EEE5FF] rounded-2xl">
							<LogoutIcon />
						</div>
						<p className="text-base font-medium text-[#292B2D]">Logout</p>
					</div>
				</div>
			</div>
			<BottomNavigation />
		</>
	);
}
