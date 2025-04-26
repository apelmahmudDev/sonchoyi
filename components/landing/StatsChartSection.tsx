"use client";

import Chart from "react-apexcharts";
import { motion } from "framer-motion";
import { Activity, TrendingUp, Users } from "lucide-react";
import type { ApexOptions } from "apexcharts";

const chartOptions: ApexOptions = {
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
	stroke: {
		curve: "smooth",
		show: true,
	},
	tooltip: {
		x: { format: "dd/MM/yy HH:mm" },
	},
	xaxis: {
		labels: { show: false },
	},
	yaxis: {
		labels: { show: false },
	},
};

const StatsChartSection = () => {
	const seriesData = [300, 450, 350, 600, 500, 700, 800];
	const series = [{ name: "Spend", data: seriesData }];

	const stats = [
		{
			label: "Users Budgeting",
			value: "1.4K+",
			icon: <Users className="w-5 h-5 text-indigo-500" />,
		},
		{
			label: "Monthly Spend",
			value: "$72K+",
			icon: <TrendingUp className="w-5 h-5 text-green-500" />,
		},
		{
			label: "Avg Saved",
			value: "$320",
			icon: <Activity className="w-5 h-5 text-purple-500" />,
		},
		{
			label: "Savings Growth",
			value: "18%",
			icon: <TrendingUp className="w-5 h-5 text-pink-500" />,
		},
	];

	return (
		<section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
			<div className="max-w-7xl mx-auto px-6">
				{/* Heading */}
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">
						Real-Time{" "}
						<span className="text-indigo-600 dark:text-indigo-400">
							Stats & Charts
						</span>
					</h2>
					<p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
						Live insights from thousands of Sonchoyi users. See how money flows
						in real time.
					</p>
				</div>

				{/* Grid */}
				<div className="flex flex-col lg:flex-row items-center justify-between gap-12">
					{/* Stats */}
					<div className="w-full lg:w-1/2 grid grid-cols-2 gap-6">
						{stats.map((stat, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.15 }}
								className="bg-white dark:bg-slate-800 backdrop-blur-md rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 text-center hover:bg-indigo-100 dark:hover:bg-indigo-600 transition duration-300"
							>
								<div className="flex items-center justify-center mb-2">
									{stat.icon}
								</div>
								<p className="text-3xl font-bold text-[#7F3DFF] mb-1">
									{stat.value}
								</p>
								<p className="text-slate-600 dark:text-slate-300 text-sm">
									{stat.label}
								</p>
							</motion.div>
						))}
					</div>

					{/* Chart */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.3 }}
						className="w-full lg:w-1/2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 relative"
					>
						{/* Floating Badge */}
						<div className="absolute top-4 right-4 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
							🔁 Live tracking enabled
						</div>

						<Chart
							options={chartOptions}
							series={series}
							type="area"
							height={300}
						/>

						{/* Chart Caption */}
						<p className="mt-4 text-sm text-slate-600 dark:text-slate-400 text-center">
							This chart shows your weekly spending trend. Stay ahead by
							tracking smart!
						</p>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default StatsChartSection;
