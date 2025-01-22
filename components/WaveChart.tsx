"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { cn } from "@/lib/utils";

// Dynamically import the chart to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});

type TimePeriodKey = "today" | "weekly" | "monthly" | "yearly";

interface TimePeriodData {
	labels: string[];
	data: number[];
}

const timePeriods: Record<TimePeriodKey, TimePeriodData> = {
	today: {
		labels: ["12 AM", "6 AM", "12 PM", "6 PM"],
		data: [5, 15, 10, 20],
	},
	weekly: {
		labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		data: [50, 30, 40, 20, 60, 35, 45],
	},
	monthly: {
		labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
		data: [200, 300, 250, 400],
	},
	yearly: {
		labels: [
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
		],
		data: [800, 650, 900, 750, 1200, 1100, 950, 880, 1030, 1150, 980, 1050],
	},
};

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
	const [timePeriod, setTimePeriod] = useState<TimePeriodKey>("weekly");
	const [chartOptions, setChartOptions] = useState<ApexOptions>(
		getChartOptions(
			timePeriods[timePeriod].labels,
			timePeriods[timePeriod].data
		)
	);

	// Handle time period change
	useEffect(() => {
		const { labels, data } = timePeriods[timePeriod];
		setChartOptions(getChartOptions(labels, data));
	}, [timePeriod]);

	return (
		<div>
			<div id="chart" className="h-[193px]">
				<Chart
					options={chartOptions}
					series={chartOptions.series!}
					type="area"
					height={185}
				/>
			</div>
			<div className="flex justify-between">
				{(Object.keys(timePeriods) as TimePeriodKey[]).map((period) => (
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
