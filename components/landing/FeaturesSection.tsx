"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PiggyBank, BarChart2, Clock } from "lucide-react";

const features = [
	{
		icon: <PiggyBank className="h-8 w-8 text-primary" />,
		title: "Budget Like a Pro",
		desc: "Effortlessly build budgets and crush your financial goals in real-time.",
	},
	{
		icon: <BarChart2 className="h-8 w-8 text-primary" />,
		title: "Visualize Your Spending",
		desc: "Get a crystal-clear view of where your money’s going — with sleek charts.",
	},
	{
		icon: <Clock className="h-8 w-8 text-primary" />,
		title: "Track Anytime, Anywhere",
		desc: "Access your finances on the go. Your dashboard travels with you.",
	},
];

export default function FeaturesSection() {
	return (
		<section
			id="features"
			className="relative py-24 bg-gradient-to-br from-[#f4f7ff] to-[#e7ecff] dark:from-[#0f172a] dark:to-[#1e293b] overflow-hidden"
		>
			{/* Optional noise/texture overlay */}
			<div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-20 bg-feature bg-cover bg-no-repeat bg-top z-0 bg-fixed" />

			<div className="relative z-10 max-w-7xl mx-auto px-6">
				<div className="text-center mb-16 space-y-4">
					<h2 className="text-4xl font-bold text-foreground">
						Why Choose <span className="text-primary">Sonchoyi</span>?
					</h2>
					<p className="text-muted-foreground max-w-xl mx-auto text-base">
						Managing your money should feel simple, smooth, and kinda ✨fun✨ —
						and that’s what we’re here for.
					</p>
				</div>

				<div className="grid gap-10 md:grid-cols-3">
					{features.map((feature, index) => (
						<FeatureCard key={index} {...feature} delay={index * 0.2} />
					))}
				</div>
			</div>
		</section>
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FeatureCard({ icon, title, desc, delay }: any) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 40 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.6, ease: "easeOut", delay }}
			className="group p-6 rounded-2xl border bg-card text-card-foreground shadow-sm transition hover:shadow-lg hover:border-primary/40 relative overflow-hidden"
		>
			{/* Subtle glowing background blob */}
			<div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-60 transition duration-300 z-0" />

			<div className="relative z-10 mb-4">{icon}</div>
			<h3 className="relative z-10 text-xl font-semibold mb-2">{title}</h3>
			<p className="relative z-10 text-muted-foreground">{desc}</p>
		</motion.div>
	);
}
