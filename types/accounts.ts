export interface LinkedAccount {
	accountId: string;
	accountName: string;
	balance: number;
	_id: string;
}

export interface SubAccount {
	id: string;
	userId: string;
	accountName: string;
	accountType: string;
	bankName: string | undefined;
	balance: number;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface SubAccountResponse {
	success: boolean;
	data: SubAccount[];
}
