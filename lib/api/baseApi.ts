import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_API_URL,
		prepareHeaders: (headers, { getState }) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const token = (getState() as any).auth.token;
			if (token) headers.set("Authorization", `Bearer ${token}`);
			return headers;
		},
	}),
	tagTypes: ["User", "Account", "Transaction"],
	endpoints: () => ({}),
});

export default baseApi;
