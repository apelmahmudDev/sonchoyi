import { Card, CardContent } from "@/components/ui/card";
import AccountTable from "./_components/account-table";
import Breadcrumb from "@/components/breadcrumb";
import Header from "@/components/Header";
import { auth } from "@/auth";
import { getSubAccountsByUserId, getUserByEmail } from "@/database/queries";

export default async function AccountList() {
	const session = await auth();
	const user = await getUserByEmail(session?.user?.email as string);
	const wallets = await getSubAccountsByUserId(user?.id as string);
	
	return (
		<section className="max-w-7xl mx-auto">
			<Header title="Your Accounts" />
			<Breadcrumb
				className="mt-5 mb-9"
				breadcrumbLinks={[
					{ label: "Wallet", to: "/my-wallet" },
					{ label: "Account", to: "/my-wallet/account" },
					{ label: "List" },
				]}
			/>

			<Card className="p-0">
				<CardContent className="px-0">
					<AccountTable accounts={wallets}/>
				</CardContent>
			</Card>
		</section>
	);
}
