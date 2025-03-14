import { ApiResponse, SubAccount } from "@/types";
import { baseApi } from "../baseApi";

export const subAccountApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getSubAccountsByUserId: builder.query<ApiResponse<SubAccount[]>, string>({
			query: (userId) => `/sub-accounts?userId=${userId}`,
		}),
	}),
	overrideExisting: false,
});

export const { useGetSubAccountsByUserIdQuery } = subAccountApi;
