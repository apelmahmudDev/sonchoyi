// Please delete this file (I don't used it)

import { ApiResponse, SubAccount } from "@/types";

export const fetchSubAccounts = async (
	userId: string
): Promise<ApiResponse<SubAccount[]>> => {
	if (!userId)
		return { success: false, message: "User ID is required", data: [] };

	try {
		const res = await fetch(`/api/sub-accounts?userId=${userId}`);
		const data = await res.json();
		if (!res.ok) throw new Error(data.message);
		return data;
	} catch {
		return { success: false, message: "Error occurred", data: [] };
	}
};
