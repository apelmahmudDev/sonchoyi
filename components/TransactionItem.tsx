import React from "react";

interface TransactionItemProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	type: string;
	amount: number;
	created: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
	icon,
	title,
	type,
	description,
	amount,
	created,
}) => {
	return (
		<div className="flex items-center justify-between bg-[#FCFCFC] py-[14px] px-4 rounded-3xl">
			<div className="flex items-center gap-4">
				<div className="flex items-center justify-center h-[48px] w-[48px] bg-[#FCEED4] rounded-2xl">
					{icon}
				</div>
				<div>
					<p className="font-medium text-base text-[#292B2D]">{title}</p>
					<p className="text-[#91919F] text-[14px] mt-1">{description}</p>
				</div>
			</div>
			<div className="text-right">
				<p className="font-semibold text-base text-[#FD3C4A]">
					{type === "expense" ? `- $${amount}` : `$${amount}`}
				</p>
				<p className="text-[#91919F] text-[14px] mt-1">{created}</p>
			</div>
		</div>
	);
};

export default TransactionItem;
