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
			{ userId: string, frequency: string, year?: number }
		>({
			query: ({ userId, frequency, year = ""}) => `/spending?userId=${userId}&frequency=${frequency}&year=${year}`
		}),
	}),
	overrideExisting: false,
});

export const { useGetSpendsQuery } = userApi;
