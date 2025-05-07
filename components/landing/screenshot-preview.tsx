"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import DashboardOverviewImg from "@/assets/images/dashboard-preview-3d.png";

const screenshots = [
	{
		img: DashboardOverviewImg,
		title: "Dashboard Overview",
		desc: "See your financial overview, trends, and data at a glance.",
	},
	{
		img: DashboardOverviewImg,
		title: "Expense Tracker",
		desc: "Track every penny with detailed charts and insights on spending.",
	},
	{
		img: DashboardOverviewImg,
		title: "Budgeting Tools",
		desc: "Plan and allocate budgets efficiently with smart recommendations.",
	},
];

export default function ScreenshotPreview() {
	return (
		<section className="relative py-20 bg-white dark:bg-slate-900 overflow-hidden">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">
						Live Demo{" "}
						<span className="text-indigo-600 dark:text-indigo-400">
							/ App Preview
						</span>
					</h2>
					<p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
						Get a sneak peek into the Sonchoyi app and explore its powerful
						features.
					</p>
				</div>

				<div className="grid gap-10 md:grid-cols-3">
					{screenshots.map((item, index) => (
						<ScreenshotCard key={index} {...item} delay={index * 0.2} />
					))}
				</div>
			</div>
		</section>
	);
}

function ScreenshotCard({
	img,
	title,
	desc,
	delay,
}: {
	img: StaticImageData;
	title: string;
	desc: string;
	delay: number;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.3 }}
			transition={{ duration: 0.6, ease: "easeOut", delay }}
			className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm hover:shadow-md transition"
		>
			<div className="mb-4">
				<Image
					src={img}
					alt={title}
					width={500}
					height={300}
					className="w-full h-48 object-cover rounded-lg"
				/>
			</div>
			<h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
				{title}
			</h3>
			<p className="text-slate-600 dark:text-slate-400">{desc}</p>
			<Button size="lg" className="gap-2 mt-4">
				View Demo
			</Button>
		</motion.div>
	);
}
