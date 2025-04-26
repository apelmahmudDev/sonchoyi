"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "../ui/switch";

const pricingPlans = {
	monthly: [
		{
			name: "Basic",
			price: "Free",
			features: ["Track expenses", "Set budgets", "Basic charts"],
			popular: false,
		},
		{
			name: "Pro",
			price: "$9/mo",
			features: [
				"All Basic features",
				"Advanced analytics",
				"Priority support",
			],
			popular: true,
		},
		{
			name: "Business",
			price: "$19/mo",
			features: ["All Pro features", "Multi-user support", "Export reports"],
			popular: false,
		},
	],
	yearly: [
		{
			name: "Basic",
			price: "Free",
			features: ["Track expenses", "Set budgets", "Basic charts"],
			popular: false,
		},
		{
			name: "Pro",
			price: "$90/yr",
			features: [
				"All Basic features",
				"Advanced analytics",
				"Priority support",
			],
			popular: true,
		},
		{
			name: "Business",
			price: "$190/yr",
			features: ["All Pro features", "Multi-user support", "Export reports"],
			popular: false,
		},
	],
};

const PricingSection = () => {
	const [isYearly, setIsYearly] = useState(false);
	const plans = isYearly ? pricingPlans.yearly : pricingPlans.monthly;

	return (
		<section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
			<div className="max-w-6xl mx-auto px-6 text-center">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-6"
				>
					Simple & Flexible Pricing
				</motion.h2>

				<p className="text-slate-600 dark:text-slate-400 mb-10">
					Choose a plan that fits your budgeting goals.
				</p>

				{/* Toggle */}
				<div className="flex justify-center items-center gap-4 mb-12">
					<Label className="text-slate-700 dark:text-slate-300">Monthly</Label>
					<Switch
						checked={isYearly}
						onCheckedChange={setIsYearly}
						className="data-[state=checked]:bg-indigo-500"
					/>
					<Label className="text-slate-700 dark:text-slate-300">Yearly</Label>
				</div>

				{/* Pricing Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
					{plans.map((plan, i) => (
						<motion.div
							key={plan.name}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.15 }}
							className={`rounded-2xl border p-8 text-left shadow-sm transition-all hover:shadow-lg hover:scale-105
                ${
									plan.popular
										? "bg-indigo-50 dark:bg-slate-800 border-indigo-400 dark:border-indigo-500 shadow-lg"
										: "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
								}`}
						>
							<h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
								{plan.name}
							</h3>
							<p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
								{plan.price}
							</p>
							<ul className="mb-6 space-y-2 text-slate-700 dark:text-slate-300">
								{plan.features.map((feature, idx) => (
									<li key={idx} className="flex items-center gap-2">
										<Check className="w-4 h-4 text-green-500" /> {feature}
									</li>
								))}
							</ul>
							<button
								className={`w-full py-2 rounded-lg font-medium transition 
                  ${
										plan.popular
											? "bg-indigo-600 text-white hover:bg-indigo-700"
											: "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white"
									}`}
							>
								{plan.name === "Basic" ? "Get Started" : "Choose Plan"}
							</button>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default PricingSection;
