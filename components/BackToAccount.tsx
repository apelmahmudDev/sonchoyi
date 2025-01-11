"use client";
import { ArrowLeftIcon } from "@/components/icon";
import { useRouter } from "next/navigation";

const BackToAccount = () => {
	const router = useRouter();
	const handleNavigateBack = () => {
		router.push("/account");
	};
	return (
		<button type="button" onClick={handleNavigateBack} className="text-white">
			<ArrowLeftIcon />
		</button>
	);
};

export default BackToAccount;
