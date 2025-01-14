import { WalletIcon } from "./icon";

interface AccountProps {
	accountName: string;
	balance: number;
}

const Account: React.FC<AccountProps> = ({ accountName, balance }) => {
	return (
		<div className="px-4 flex items-center gap-2 justify-between border-[#f5f5f5] border-b h-[80px]">
			<div className="flex items-center gap-2">
				<div className="bg-[#F1F1FA] h-[48px] w-[48px] flex flex-shrink-0 justify-center items-center rounded-2xl">
					<WalletIcon />
				</div>
				<p className="font-semibold text-lg text-black">{accountName}</p>
			</div>
			<p className="font-semibold text-lg text-black">${balance}</p>
		</div>
	);
};

export default Account;
