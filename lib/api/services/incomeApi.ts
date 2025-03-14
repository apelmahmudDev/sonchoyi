import { Income } from "./../../../types/income";
import { ApiResponse } from "@/types";
import { baseApi } from "../baseApi";

export const incomeApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createIncome: builder.mutation<ApiResponse<Income>, Income>({
			query: (incomeData) => ({
				url: "/income",
				method: "POST",
				body: incomeData,
			}),
			invalidatesTags: ["Account", "Transaction"],
		}),
	}),
	overrideExisting: false,
});

export const { useCreateIncomeMutation } = incomeApi;
