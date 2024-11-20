import React from "react";
import { auth } from "@/auth";
import Avatar from "./ui/avatar";
import { EditIcon } from "./icon";
import AvatarImg from "@/assets/images/avatar.jpg";

const User = async () => {
	const { user } = (await auth()) || {};

	return (
		<div className="flex items-center gap-5">
			{user?.image ? (
				<Avatar
					source={user?.image || AvatarImg}
					className="flex-shrink-0 h-[80px] w-[80px]"
				/>
			) : (
				<div className="flex-shrink-0 border-2 border-[#7F3DFF] rounded-full h-[80px] w-[80px] overflow-hidden p-1 flex items-center justify-center font-bold text-3xl bg-slate-200">
					S
				</div>
			)}
			<div className="flex-1">
				<p className="text-[#91919F] text-sm font-medium mb-2">Username</p>
				<p className="text-[#161719] text-2xl font-semibold">{user?.name}</p>
			</div>
			<button>
				<EditIcon />
			</button>
		</div>
	);
};

export default User;
