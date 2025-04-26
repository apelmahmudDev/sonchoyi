import React from "react";
import { motion } from "framer-motion";

const HowItWorksSection = () => {
	return (
		<section
			id="how-it-works"
			className="py-20 bg-gradient-to-br from-[#f9fafb] to-[#e0e7ff] dark:from-[#0f172a] dark:to-[#1e293b] transition-colors duration-300"
		>
			<div className="max-w-7xl mx-auto px-6">
				{/* Title */}
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">
						How{" "}
						<span className="text-indigo-600 dark:text-indigo-400">
							Sonchoyi
						</span>{" "}
						Works
					</h2>
					<p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
						Just 3 easy steps to take control of your money flow.
					</p>
				</div>

				{/* Steps */}
				<div className="grid gap-10 md:grid-cols-3">
					{[
						{
							icon: "📝",
							title: "Sign Up",
							desc: "Create your account in seconds and personalize your profile.",
						},
						{
							icon: "📊",
							title: "Set Your Budget",
							desc: "Add your income and expenses to build a budget that fits you.",
						},
						{
							icon: "💸",
							title: "Track & Grow",
							desc: "See where your money goes and watch your savings grow!",
						},
					].map((step, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.2 }}
							className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm hover:shadow-md transition text-center"
						>
							<div className="text-4xl mb-4">{step.icon}</div>
							<h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
								{step.title}
							</h3>
							<p className="text-slate-600 dark:text-slate-400">{step.desc}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default HowItWorksSection;
