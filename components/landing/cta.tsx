"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";

export default function CTA() {
	return (
		<section className="py-20 bg-gradient-to-br from-[#7F3DFF] to-[#3B82F6] dark:from-[#1e293b] dark:to-[#0f172a] text-center text-white">
			<div className="max-w-6xl mx-auto px-6">
				<motion.h2
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-3xl sm:text-4xl font-extrabold mb-6"
				>
					Start budgeting smarter today.
				</motion.h2>
				<p className="text-lg sm:text-xl mb-8">
					Take control of your finances with Sonchoyi. Try it now and see how
					easy budgeting can be.
				</p>

				<div className="flex justify-center items-center gap-4">
					{/* Free/Trial Badge */}
					<span className="px-4 py-2 text-sm font-semibold rounded-full bg-white text-indigo-700 dark:bg-slate-700 dark:text-slate-200">
						Free Trial
					</span>

					{/* CTA Button */}
					<Button
						size="lg"
						className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300"
					>
						Start Your Free Trial
					</Button>
				</div>
			</div>
		</section>
	);
}
