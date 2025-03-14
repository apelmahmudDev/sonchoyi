import { ApiResponse } from "@/types";
import { baseApi } from "../baseApi";

interface SubAccount {
	userId: string;
	accountName: string;
	accountType: string;
	bankName: string | undefined;
	balance: string;
}

interface ResType {
	success: boolean;
	message: string;
}

export const accountApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createAccount: builder.mutation<ApiResponse<ResType>, SubAccount>({
			query: (body) => ({
				url: "/account",
				method: "POST",
				body,
			}),
			// invalidatesTags: ["Account", "Transaction"],
		}),
	}),
	overrideExisting: false,
});

export const { useCreateAccountMutation } = accountApi;
