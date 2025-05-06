import TransactionDashboardTable from "./_components/transaction-dashboard-table";
import AccountTable from "./_components/transaction-dashboard-table";
import { transactions, wallets } from "./data/transactions";

export default function AccountCreate() {
	return (
		<section className="">
			{/* <AccountTable accounts={wallets} /> */}
			<TransactionDashboardTable transactions={transactions} />
		</section>
	);
}
