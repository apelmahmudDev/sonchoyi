import { ApiResponse, User } from "@/types";
import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getUserByEmail: builder.query<ApiResponse<User | null>, string>({
			query: (email) => `/user?email=${email}`,
		}),
	}),
	overrideExisting: false,
});

export const { useGetUserByEmailQuery } = userApi;
