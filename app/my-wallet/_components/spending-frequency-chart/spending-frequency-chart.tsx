"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { useGetUserByEmailQuery } from "@/lib/api/services/userApi";
import { useGetSpendsQuery } from "@/lib/api/services/transactionApi";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { getChartOptions } from "./chart-options";
import { defaultTimePeriods, TimePeriodKey } from "./schema";

// Dynamically import the chart to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});

const SpendingFrequencyChart: React.FC = () => {
	const { resolvedTheme } = useTheme();
	const { data: session } = useSession();
	const [timePeriod, setTimePeriod] = useState<TimePeriodKey>("weekly");
	const [chartData, setChartData] = useState(defaultTimePeriods);

	const { data: { data: user } = {} } = useGetUserByEmailQuery(
		session?.user?.email ?? "",
		{skip: !session?.user?.email}
	);

	const { data: { data: spends = [] } = {}, isSuccess } = useGetSpendsQuery(
		{ userId: user?.id as string, frequency: timePeriod },
		{ skip: !user?.id }
	);

	useEffect(() => {
		if (isSuccess && spends?.length) {
			const labels = spends.map((item) => item.label);
			const values = spends.map((item) => item.totalSpent);

			setChartData((prev) => ({
				...prev,
				[timePeriod]: { labels, data: values },
			}));
		}
	}, [spends, timePeriod, isSuccess]);

	return (
		<Card>
			<CardContent>
				<div className="flex items-center justify-between gap-6">
					<h3 className="text-lg font-semibold">Spending Frequency</h3>
					<Select
						onValueChange={(e) => setTimePeriod(e as TimePeriodKey)}
						defaultValue="weekly"
					>
						<SelectTrigger className="w-[120px] h-10">
							<SelectValue placeholder="Period" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="daily">Daily</SelectItem>
								<SelectItem value="weekly">Weekly</SelectItem>
								<SelectItem value="monthly">Monthly</SelectItem>
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

export default SpendingFrequencyChart;
