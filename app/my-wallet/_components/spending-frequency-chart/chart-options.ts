import { formatCurrency } from "@/lib/formatCurrency";
import { ApexOptions } from "apexcharts";

export const getChartOptions = (
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
        y: { formatter: (val: number) => formatCurrency(val)},
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