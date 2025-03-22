import { cn } from "@/lib/utils";
import React from "react";

interface BankProps {
	selected?: boolean;
	bankIcon: React.ReactNode;
	onSelect: () => void;
}

const Bank: React.FC<BankProps> = ({ selected, bankIcon, onSelect }) => {
	return (
		<button
			type="button"
			onClick={onSelect}
			className={cn(
				"flex-shrink-0 flex items-center justify-center text-xs h-10 w-20 bg-secondary rounded-sm",
				{ "border border-primary": selected }
			)}
		>
			{bankIcon}
		</button>
	);
};

export default Bank;
