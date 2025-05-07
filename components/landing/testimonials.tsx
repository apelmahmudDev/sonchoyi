/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
	{
		name: "Sarah Islam",
		role: "Freelancer",
		rating: 5,
		quote:
			"Sonchoyi changed my entire money game. I finally feel in control of my finances!",
		avatar: "https://i.pravatar.cc/150?img=47",
	},
	{
		name: "Rafiul Haque",
		role: "Student",
		rating: 4,
		quote:
			"Budgeting as a student used to be hard. Now it’s fun, easy, and actually works!",
		avatar: "https://i.pravatar.cc/150?img=64",
	},
	{
		name: "Jannatul Nayem",
		role: "UI/UX Designer",
		rating: 5,
		quote: "Love the interface, love the flow. Everything just makes sense. 💜",
		avatar: "https://i.pravatar.cc/150?img=32",
	},
];

export default function Testimonials() {
	return (
		<section className="py-20 bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100 dark:from-slate-800 dark:via-slate-900 dark:to-indigo-900 transition-colors duration-300">
			<div className="max-w-6xl mx-auto px-6">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">
						What Our Users Say
					</h2>
					<p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
						Real stories from real people who now manage their money like pros.
					</p>
				</div>

				{/* Testimonials Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
					{testimonials.map((user, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.15 }}
							className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300"
						>
							{/* Avatar + Name */}
							<div className="flex items-center gap-4 mb-4">
								<img
									src={user.avatar}
									alt={user.name}
									className="w-14 h-14 rounded-full object-cover"
								/>
								<div>
									<h4 className="font-semibold text-slate-800 dark:text-white">
										{user.name}
									</h4>
									<p className="text-sm text-slate-500 dark:text-slate-400">
										{user.role}
									</p>
								</div>
							</div>

							{/* Quote */}
							<p className="text-slate-700 dark:text-slate-300 mb-4">
								&ldquo;{user.quote}&rdquo;
							</p>

							{/* Stars */}
							<div className="flex">
								{Array.from({ length: user.rating }).map((_, idx) => (
									<Star
										key={idx}
										className="w-4 h-4 fill-yellow-400 stroke-yellow-400 mr-1"
									/>
								))}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
