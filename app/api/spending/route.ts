import { NextResponse } from "next/server";
import { connectToDatabase } from "@/service/mongo";
import { transactionModel } from "@/models/transactions-model";
import {
	startOfYear,
	startOfMonth,
	startOfWeek,
	startOfToday,
	format,
} from "date-fns";
import createErrorResponse from "@/lib/createErrorResponse";

export async function GET(request: Request) {
	try {
		await connectToDatabase();

		const { searchParams } = new URL(request.url);
		const filterType = searchParams.get("type"); // 'month', 'week', 'year', 'today'

		let startDate;
		let dateFormat;
		let groupingField;

		switch (filterType) {
			case "month":
				startDate = startOfYear(new Date());
				dateFormat = "%m"; // Group by month (01, 02, ..., 12)
				groupingField = {
					$month: "$date",
				};
				break;

			case "week":
				startDate = startOfMonth(new Date());
				dateFormat = "%u"; // Group by day of the week (1=Monday, 7=Sunday)
				groupingField = {
					$dayOfWeek: "$date",
				};
				break;

			case "year":
				startDate = startOfYear(new Date());
				dateFormat = "%Y"; // Group by year (e.g., 2024)
				groupingField = {
					$year: "$date",
				};
				break;

			case "today":
				startDate = startOfToday();
				dateFormat = "%H"; // Group by hour (00, 01, ..., 23)
				groupingField = {
					$hour: "$date",
				};
				break;

			default:
				return createErrorResponse({
					message:
						"Invalid filter type. Use 'month', 'week', 'year', or 'today'.",
					status: 400,
				});
		}

		const spending = await transactionModel.aggregate([
			{
				$match: {
					type: "expense", // Filter only expenses
					date: { $gte: startDate },
				},
			},
			{
				$group: {
					_id: groupingField,
					totalSpent: { $sum: "$amount" },
					count: { $sum: 1 },
				},
			},
			{
				$sort: { _id: 1 }, // Sort results chronologically
			},
		]);

		// Mapping the aggregation result to human-readable labels
		console.log("spending", spending);
		const formattedData = spending.map((item) => ({
			label: formatLabel(filterType, item._id),
			totalSpent: item.totalSpent,
			count: item.count,
		}));

		return NextResponse.json(formattedData, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Something went wrong while fetching spending data." },
			{ status: 500 }
		);
	}
}

// Helper function to format the result labels
const formatLabel = (type, value) => {
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const weekDays = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	switch (type) {
		case "month":
			return monthNames[value - 1];
		case "week":
			return weekDays[value - 1];
		case "year":
			return value.toString();
		case "today":
			return `${value}:00 - ${value + 1}:00`;
		default:
			return value;
	}
};
