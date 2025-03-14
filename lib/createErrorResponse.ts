import { NextResponse } from "next/server";

interface ErrorResponseOptions {
	message: string;
	status?: number;
}

/**
 * Creates an error response for Next.js API routes.
 * @param {ErrorResponseOptions} options - Error message and optional status code.
 * @returns {NextResponse} - JSON formatted error response.
 */
const createErrorResponse = ({
	message,
	status = 400,
}: ErrorResponseOptions): NextResponse => {
	return new NextResponse(
		JSON.stringify({
			success: false,
			message,
		}),
		{
			status,
			headers: { "Content-Type": "application/json" },
		}
	);
};

export default createErrorResponse;
