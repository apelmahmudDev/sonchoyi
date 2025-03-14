/* eslint-disable @typescript-eslint/no-explicit-any */

// export function transformResponse<T extends Record<string, any>>(
// 	data: T | T[]
// ): T | T[] {
// 	if (Array.isArray(data)) {
// 		return data.map((item) => ({
// 			...item,
// 			id: item._id.toString(),
// 			_id: undefined, // Remove _id
// 		}));
// 	}

// 	return {
// 		...data,
// 		id: data._id.toString(),
// 		_id: undefined, // Remove _id
// 	};
// }

// export function transformResponse<T extends Record<string, any>>(data: T | T[]): T | T[] {
// 	if (Array.isArray(data)) {
// 		return data.map(({ _id, ...rest }) => ({
// 			...rest,
// 			id: _id?.toString(),
// 		})) as unknown as T[];
// 	}

// 	const { _id, ...rest } = data;
// 	return {
// 		...rest,
// 		id: _id?.toString(),
// 	} as unknown as T[];
// }

export function transformResponse(data: any) {
	if (Array.isArray(data)) {
		return data.map(({ _id, ...rest }) => ({
			...rest,
			id: _id?.toString(),
		}));
	}

	const { _id, ...rest } = data;
	return {
		...rest,
		id: _id?.toString(),
	} ;
}

export function transformRequest<T extends Record<string, any>>(
	data: T
): Omit<T, "id"> & { _id: string } {
	if (!data) return data as any; // Ensure null safety

	const { id, ...rest } = data;
	return { ...rest, _id: id } as Omit<T, "id"> & { _id: string }; // Convert `id` back to `_id`
}
