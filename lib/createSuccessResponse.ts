import { NextResponse } from "next/server";

interface SuccessResponseOptions<T> {
	data?: T;
	message?: string;
	status?: number;
}

/**
 * Creates a success response for Next.js API routes.
 * @param {SuccessResponseOptions<T>} options - Response data, optional message, and status code.
 * @returns {NextResponse} - JSON formatted success response.
 */
const createSuccessResponse = <T>({
	data,
	message = "Request successful",
	status = 200,
}: SuccessResponseOptions<T>): NextResponse => {
	return new NextResponse(
		JSON.stringify({
			success: true,
			message,
			data,
		}),
		{
			status,
			headers: { "Content-Type": "application/json" },
		}
	);
};

export default createSuccessResponse;
