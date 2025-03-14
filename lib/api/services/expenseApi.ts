import { Expense } from "./../../../types/income";
import { ApiResponse } from "@/types";
import { baseApi } from "../baseApi";

export const expenseApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createExpense: builder.mutation<ApiResponse<Expense>, Expense>({
			query: (expenseData) => ({
				url: "/expense",
				method: "POST",
				body: expenseData,
			}),
			invalidatesTags: ["Account", "Transaction"],
		}),
	}),
	overrideExisting: false,
});

export const { useCreateExpenseMutation } = expenseApi;
