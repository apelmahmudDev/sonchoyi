"use client";
import React from "react";
const Chart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
// chart options
const options: ApexOptions = {
	chart: {
		// height: 350,
		type: "area",
		toolbar: {
			show: false,
		},
		foreColor: "rgba(0 0 0 / 50%)",
		zoom: {
			enabled: false,
		},
	},
	grid: {
		show: false,
		borderColor: "#F4F4F4",
		padding: {
			left: -10,
			right: 0,
		},
	},
	fill: {
		type: "gradient",
		// opacity: 0.5,
		// type: "solid",
		gradient: {
			// shadeIntensity: 1,
			// opacityFrom: 0,
			// opacityTo: 0.9,
			colorStops: [
				{
					offset: 20,
					color: "#7F3DFF",
					opacity: 0.6,
				},
				{
					offset: 80,
					color: "#7F3DFF",
					opacity: 0.1,
				},
			],
		},
	},
	colors: ["#7F3DFF"],
	dataLabels: {
		enabled: false,
	},
	stroke: {
		curve: "smooth",
		show: true,
	},
	tooltip: {
		x: {
			format: "dd/MM/yy HH:mm",
		},
	},
	xaxis: {
		labels: {
			show: false,
		},
		categories: ["Jan", "Feb", "Mar", "Apr", "May"],
	},
	yaxis: {
		labels: {
			show: false,
		},
	},
	series: [
		{
			name: "spend",
			data: [30, 15, 25, 12, 40, 20],
		},
	],
};

// chart series
// const series = [
// 	{
// 		name: "spend",
// 		data: [28, 18, 28, 19, 12, 25, 35, 20, 30, 40, 50, 60],
// 	},
// ];

const WaveChart = () => {
	return (
		<div id="chart" className="h-[193px]">
			<Chart
				options={options}
				series={options.series}
				type="area"
				height={185}
			/>
		</div>
	);
};

export default WaveChart;
