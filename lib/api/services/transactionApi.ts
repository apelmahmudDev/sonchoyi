import { ApiResponse } from "@/types";
import { baseApi } from "../baseApi";

interface SpendingData {
	label: string;
	totalSpent: number;
	count: number;
}

export const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getSpends: builder.query<
			ApiResponse<SpendingData[]>,
			{ type: string; userId: string }
		>({
			query: ({ type, userId }) => `/spending?type=${type}&userId=${userId}`,
		}),
	}),
	overrideExisting: false,
});

export const { useGetSpendsQuery } = userApi;
