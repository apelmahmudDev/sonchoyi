import { connectToDatabase } from "@/service/mongo";
import { transactionModel } from "@/models/transactions-model";
import {
  startOfYear,
  startOfMonth,
} from "date-fns";
import createErrorResponse from "@/lib/createErrorResponse";
import createSuccessResponse from "@/lib/createSuccessResponse";
import { ObjectId } from "mongodb";

// Frequency config map
const FREQUENCY_CONFIG: Record<
  string,
  {
    getDateRange: (year?: number) => { startDate: Date; endDate: Date };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    groupBy: any;
    labelFormatter: (value: number | string) => string;
  }
> = {
  weekly: {
    getDateRange: () => {
      const startDate = startOfMonth(new Date());
      const endDate = new Date(); // until now
      return { startDate, endDate };
    },
    groupBy: { $dayOfWeek: "$date" },
	labelFormatter: (value: string | number) =>
		typeof value === "number"
		  ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][value - 1]
		  : value,	  
  },
  monthly: {
    getDateRange: () => {
      const startDate = startOfYear(new Date());
      const endDate = new Date(); // until now
      return { startDate, endDate };
    },
    groupBy: {
      $switch: {
        branches: [
          { case: { $lte: [{ $dayOfMonth: "$date" }, 7] }, then: "Week 1" },
          { case: { $lte: [{ $dayOfMonth: "$date" }, 14] }, then: "Week 2" },
          { case: { $lte: [{ $dayOfMonth: "$date" }, 21] }, then: "Week 3" },
          { case: { $lte: [{ $dayOfMonth: "$date" }, 31] }, then: "Week 4" },
        ],
        default: "Week 4",
      },
    },
	labelFormatter: (value: string | number) =>
		typeof value === "string" ? value : value.toString(),	  
  },
  yearly: {
    getDateRange: (year?: number) => {
      const y = year || new Date().getFullYear();
      const startDate = new Date(`${y}-01-01T00:00:00Z`);
      const endDate = new Date(`${y + 1}-01-01T00:00:00Z`);
      return { startDate, endDate };
    },
    groupBy: { $month: "$date" },
	labelFormatter: (value: string | number) =>
		typeof value === "number"
		  ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][value - 1]
		  : value,
  },
};

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const frequency = searchParams.get("frequency") || "monthly";
    const userId = searchParams.get("userId");
    const yearParam = searchParams.get("year");
    const year = yearParam ? parseInt(yearParam) : undefined;

    if (!userId) {
      return createErrorResponse({
        message: "User ID is required.",
        status: 400,
      });
    }

    const config = FREQUENCY_CONFIG[frequency];
    if (!config) {
      return createErrorResponse({
        message: "Invalid frequency. Use 'weekly', 'monthly', or 'yearly'.",
        status: 400,
      });
    }

    const { startDate, endDate } = config.getDateRange(year);
    const userIdObj = new ObjectId(userId);

    const spending = await transactionModel.aggregate([
      {
        $match: {
          userId: userIdObj,
          type: "expense",
          date: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: config.groupBy,
          totalSpent: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const formattedData = spending.map((item) => ({
      label: config.labelFormatter(item._id),
      totalSpent: item.totalSpent,
      count: item.count,
    }));

    return createSuccessResponse({
      status: 200,
      data: formattedData,
    });
  } catch (error) {
    console.error(error);
    return createErrorResponse({
      message: "Something went wrong while fetching spending data.",
      status: 500,
    });
  }
}