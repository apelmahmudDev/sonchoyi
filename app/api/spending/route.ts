import { connectToDatabase } from "@/service/mongo";
import { transactionModel } from "@/models/transactions-model";
import { startOfYear, startOfMonth, startOfToday } from "date-fns";
import createErrorResponse from "@/lib/createErrorResponse";
import createSuccessResponse from "@/lib/createSuccessResponse";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
	try {
		await connectToDatabase();

		const { searchParams } = new URL(request.url);
		const filterType = searchParams.get("type"); // 'month', 'week', 'year', 'today'
		const userId = searchParams.get("userId");

		if (!userId) {
			return createErrorResponse({
				message: "User ID is required.",
				status: 400,
			});
		}

		let startDate;
		let groupingField;

		switch (filterType) {
			case "month":
				startDate = startOfYear(new Date());
				groupingField = { $month: "$date" };
				break;

			case "week":
				startDate = startOfMonth(new Date());
				groupingField = { $dayOfWeek: "$date" };
				break;

			case "year":
				startDate = startOfYear(new Date());
				groupingField = { $year: "$date" };
				break;

			case "today":
				startDate = startOfToday();
				groupingField = { $hour: "$date" };
				break;

			default:
				return createErrorResponse({
					message:
						"Invalid filter type. Use 'month', 'week', 'year', or 'today'.",
					status: 400,
				});
		}

		// Convert userId to ObjectId
		const userIdObj = new ObjectId(userId);

		const spending = await transactionModel.aggregate([
			{
				$match: {
					userId: userIdObj,
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
		const formattedData = spending.map((item) => ({
			label: formatLabel(filterType, item._id),
			totalSpent: item.totalSpent,
			count: item.count,
		}));

		return createSuccessResponse({
			status: 200,
			data: formattedData,
		});
	} catch {
		return createErrorResponse({
			message: "Something went wrong while fetching spending data.",
			status: 500,
		});
	}
}

// Helper function to format the result labels
const formatLabel = (type: string, value: number) => {
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
			return value.toString();
	}
};
