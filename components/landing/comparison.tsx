"use client";

import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const features = [
	"Free to Start",
	"Real-Time Tracking",
	"Bangla Language Support",
	"Modern UI/UX",
	"Offline Mode",
	"Custom Categories",
	"Export Options",
];

const data = [
	{
		name: "Sonchoyi",
		values: [true, true, true, true, true, true, true],
	},
	{
		name: "Mint",
		values: [true, true, false, false, false, true, false],
	},
	{
		name: "YNAB",
		values: [false, true, false, true, false, true, true],
	},
];

export default function Comparison() {
	return (
		<section className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-4"
				>
					Why Sonchoyi over others?
				</motion.h2>
				<p className="text-slate-600 dark:text-slate-300 mb-10">
					We offer features tailored for everyday users in Bangladesh and
					beyond.
				</p>

				<div className="overflow-x-auto">
					<table className="min-w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
						<thead className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm">
							<tr>
								<th className="text-left p-4">Features</th>
								{data.map((brand, idx) => (
									<th
										key={idx}
										className={`p-4 font-semibold ${
											brand.name === "Sonchoyi"
												? "bg-blue-100 dark:bg-blue-600 text-blue-600 dark:text-blue-200"
												: ""
										}`}
									>
										{brand.name}
									</th>
								))}
							</tr>
						</thead>
						<tbody className="text-slate-600 dark:text-slate-300 text-sm">
							{features.map((feature, i) => (
								<tr
									key={i}
									className="border-t border-slate-200 dark:border-slate-700"
								>
									<td className="text-left font-medium p-4">{feature}</td>
									{data.map((brand, j) => (
										<td
											key={j}
											className={`text-center p-4 ${
												brand.name === "Sonchoyi"
													? "bg-blue-50 dark:bg-blue-700"
													: ""
											}`}
										>
											{brand.values[i] ? (
												<Check className="mx-auto text-green-500" />
											) : (
												<X className="mx-auto text-red-500" />
											)}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}
