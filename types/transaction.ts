export interface Transaction {
	id: string;
	amount: number;
	type: "income" | "expense";
	category: string;
	date: string;
	note?: string;
}

export type TransactionList = Transaction[];
