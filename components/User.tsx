import React from "react";
import Avatar from "./ui/avatar";
import AvatarImg from "@/assets/images/avatar.jpg";
import { EditIcon } from "./icon";
import { auth } from "@/auth";

const User = async () => {
	const { user } = (await auth()) || {};

	return (
		<div className="flex items-center gap-5">
			<Avatar source={user?.image || AvatarImg} className="h-[80px] w-[80px]" />
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
