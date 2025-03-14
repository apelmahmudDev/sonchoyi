export interface Income {
	userId: string;
	accountId: string;
	category: string;
	amount: number;
	description?: string;
	attachment?: string;
	repeat?: {
		frequency: "daily" | "weekly" | "monthly" | "yearly";
		endDate: string;
	};
	date?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Expense extends Income {}
