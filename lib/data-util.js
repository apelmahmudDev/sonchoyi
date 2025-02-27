export const replaceMongoIdInArray = (array) => {
	const mappedArray = array
		.map((item) => {
			return {
				id: item._id.toString(),
				...item,
			};
		})
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		.map(({ _id, ...rest }) => rest);

	return mappedArray;
};

export const replaceMongoIdInObject = (obj) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { _id, ...updatedObj } = { ...obj, id: obj?._id.toString() };
	return updatedObj;
};
