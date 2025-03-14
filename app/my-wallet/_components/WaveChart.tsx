"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { cn } from "@/lib/utils";

// Dynamically import the chart to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});

// Type definitions
type TimePeriodKey = "today" | "week" | "month" | "year";

interface SpendingData {
	label: string;
	totalSpent: number;
	count: number;
}

// Default placeholder values
const defaultTimePeriods: Record<
	TimePeriodKey,
	{ labels: string[]; data: number[] }
> = {
	today: { labels: [], data: [] },
	week: { labels: [], data: [] },
	month: { labels: [], data: [] },
	year: { labels: [], data: [] },
};

// Chart configuration function
const getChartOptions = (
	xaxisLabels: string[],
	seriesData: number[]
): ApexOptions => ({
	chart: {
		type: "area",
		toolbar: { show: false },
		foreColor: "rgba(0 0 0 / 50%)",
		zoom: { enabled: false },
	},
	grid: {
		show: false,
		borderColor: "#F4F4F4",
		padding: { left: -10, right: 0 },
	},
	fill: {
		type: "gradient",
		gradient: {
			colorStops: [
				{ offset: 20, color: "#7F3DFF", opacity: 0.6 },
				{ offset: 80, color: "#7F3DFF", opacity: 0.1 },
			],
		},
	},
	colors: ["#7F3DFF"],
	dataLabels: { enabled: false },
	stroke: { curve: "smooth", show: true },
	tooltip: { x: { format: "dd/MM/yy HH:mm" } },
	xaxis: { categories: xaxisLabels, labels: { show: false } },
	yaxis: { labels: { show: false } },
	series: [{ name: "Spend", data: seriesData }],
});

const WaveChart: React.FC = () => {
	const [timePeriod, setTimePeriod] = useState<TimePeriodKey>("week");
	const [chartData, setChartData] = useState(defaultTimePeriods);
	const [isLoading, setIsLoading] = useState(false);

	// Fetch spending data based on selected time period
	useEffect(() => {
		const fetchSpendingData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(`/api/spending?type=${timePeriod}`);
				if (!response.ok) throw new Error("Failed to fetch data");

				const data: SpendingData[] = await response.json();
				const labels = data.map((item) => item.label);
				const values = data.map((item) => item.totalSpent);

				setChartData((prev) => ({
					...prev,
					[timePeriod]: { labels, data: values },
				}));
			} catch (error) {
				console.error("Error fetching spending data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchSpendingData();
	}, [timePeriod]);

	return (
		<div>
			<div id="chart" className="h-[250px]">
				{isLoading ? (
					<p className="text-center text-gray-500">Loading chart...</p>
				) : (
					<Chart
						options={getChartOptions(
							chartData[timePeriod].labels,
							chartData[timePeriod].data
						)}
						series={[{ name: "Spend", data: chartData[timePeriod].data }]}
						type="area"
						height={205}
					/>
				)}
			</div>
			<div className="flex justify-between mt-4">
				{(Object.keys(defaultTimePeriods) as TimePeriodKey[]).map((period) => (
					<button
						key={period}
						onClick={() => setTimePeriod(period)}
						className={cn("px-6 py-2 text-sm rounded-3xl text-[#91919F]", {
							"bg-[#FCEED4] text-[#FCAC12] font-bold": timePeriod === period,
						})}
					>
						{period.charAt(0).toUpperCase() + period.slice(1)}
					</button>
				))}
			</div>
		</div>
	);
};

export default WaveChart;
