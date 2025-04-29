"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useSession } from "next-auth/react";
import { useGetUserByEmailQuery } from "@/lib/api/services/userApi";
import { useGetSpendsQuery } from "@/lib/api/services/transactionApi";
import { Card, CardContent } from "@/components/ui/card";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";

// Dynamically import the chart to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});

// Type definitions
type TimePeriodKey = "today" | "week" | "month" | "year";

// Default placeholder values
const defaultTimePeriods: Record<
	TimePeriodKey,
	{ labels: string[]; data: number[] }
> = {
	today: {
		labels: [
			"12 AM",
			"1 AM",
			"2 AM",
			"3 AM",
			"4 AM",
			"5 AM",
			"6 AM",
			"7 AM",
			"8 AM",
			"9 AM",
			"10 AM",
			"11 AM",
			"12 PM",
			"1 PM",
			"2 PM",
			"3 PM",
			"4 PM",
			"5 PM",
			"6 PM",
			"7 PM",
			"8 PM",
			"9 PM",
			"10 PM",
			"11 PM",
		],
		data: [
			2, 1, 0, 0, 1, 3, 5, 10, 12, 15, 18, 22, 20, 19, 17, 16, 14, 12, 10, 8, 6,
			4, 3, 2,
		], // hourly data
	},
	week: {
		labels: [
			"Saturday",
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
		],
		data: [100, 120, 90, 110, 95, 105, 115],
	},
	month: {
		labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
		data: Array.from(
			{ length: 30 },
			() => Math.floor(Math.random() * 100) + 50
		),
	},
	year: {
		labels: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		],
		data: [500, 700, 800, 750, 600, 850, 900, 870, 920, 940, 970, 1000],
	},
};

// Chart configuration function
const getChartOptions = (
	xaxisLabels: string[],
	seriesData: number[],
	isDarkMode = false
): ApexOptions => ({
	chart: {
		type: "area",
		toolbar: { show: false },
		foreColor: isDarkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.5)",
		zoom: { enabled: false },
		background: "transparent",
	},
	grid: {
		show: true,
		borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#F4F4F4",
		strokeDashArray: 3,
	},
	fill: {
		type: "gradient",
		gradient: {
			colorStops: [
				{
					offset: 20,
					color: "#7f5af0",
					opacity: isDarkMode ? 0.2 : 0,
				},
				{
					offset: 80,
					color: "#7f5af0",
					opacity: isDarkMode ? 0.6 : 0.5,
				},
			],
		},
	},
	markers: {
		size: 5,
		hover: { size: 8 },
	},
	stroke: {
		curve: "smooth",
		show: true,
	},
	colors: ["#7f5af0"],
	dataLabels: { enabled: false },
	tooltip: {
		theme: isDarkMode ? "dark" : "light",
		x: { format: "dd/MM/yy HH:mm" },
	},
	xaxis: {
		categories: xaxisLabels,
		labels: {
			show: true,
			style: {
				colors: isDarkMode ? "#A1A1AA" : "#6B7280", // Soft gray tones
			},
		},
	},
	yaxis: {
		labels: {
			style: {
				colors: isDarkMode ? "#A1A1AA" : "#6B7280",
			},
		},
	},
	series: [{ name: "Spending", data: seriesData }],
});

const ChartExample: React.FC = () => {
	const { resolvedTheme } = useTheme();
	const { data: session } = useSession();
	const [timePeriod, setTimePeriod] = useState<TimePeriodKey>("year");
	const [chartData, setChartData] = useState(defaultTimePeriods);

	const { data: { data: user } = {}, isLoading } = useGetUserByEmailQuery(
		session?.user?.email ?? "",
		{
			skip: !session?.user?.email,
		}
	);

	const { data: { data: spends = [] } = {}, isSuccess } = useGetSpendsQuery(
		{ type: timePeriod, userId: user?.id as string },
		{ skip: !user?.id }
	);

	useEffect(() => {
		if (isSuccess && spends?.length) {
			const labels = spends.map((item) => item.label);
			const values = spends.map((item) => item.totalSpent);

			// setChartData((prev) => ({
			// 	...prev,
			// 	[timePeriod]: { labels, data: values },
			// }));
		}
	}, [spends, timePeriod, isSuccess]);

	return (
		<Card>
			<CardContent>
				<div className="flex items-center justify-between gap-6">
					<h3 className="text-lg font-semibold">Spending Frequency</h3>
					<Select onValueChange={(e) => setTimePeriod(e)}>
						<SelectTrigger className="w-[120px] h-10">
							<SelectValue placeholder="Period" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="week">Weekly</SelectItem>
								<SelectItem value="month">Monthly</SelectItem>
								<SelectItem value="year">Yearly</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div id="chart" className="mt-4">
					<Chart
						options={getChartOptions(
							chartData[timePeriod].labels,
							chartData[timePeriod].data,
							resolvedTheme === "dark" ? true : false
						)}
						series={[{ name: "Spending", data: chartData[timePeriod].data }]}
						type="area"
						height={350}
					/>
				</div>
			</CardContent>
		</Card>
	);
};

export default ChartExample;
