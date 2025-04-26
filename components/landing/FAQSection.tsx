"use client";

import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@radix-ui/react-accordion"; // Adjust this based on your actual ShadCN import if needed
import { motion } from "framer-motion";

const FAQSection = () => {
	return (
		<section className="py-20 bg-gradient-to-br from-[#f9fafb] to-[#e0e7ff] dark:from-[#0f172a] dark:to-[#1e293b]">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-16">
					<motion.h2
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-4"
					>
						Frequently Asked Questions
					</motion.h2>
					<p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">
						Everything you need to know about Sonchoyi — all in one place.
					</p>
				</div>

				{/* Accordion FAQ */}
				<div className="space-y-4">
					<Accordion type="single" collapsible>
						<AccordionItem
							value="item-1"
							className="border-b border-slate-200 dark:border-slate-700"
						>
							<AccordionTrigger className="text-lg font-semibold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 p-3 rounded-md">
								What is Sonchoyi?
							</AccordionTrigger>
							<AccordionContent className="text-slate-600 dark:text-slate-400 p-3">
								Sonchoyi is a user-friendly finance management app that helps
								you track your spending, set budgets, and achieve your financial
								goals.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							value="item-2"
							className="border-b border-slate-200 dark:border-slate-700"
						>
							<AccordionTrigger className="text-lg font-semibold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 p-3 rounded-md">
								Is there a free trial available?
							</AccordionTrigger>
							<AccordionContent className="text-slate-600 dark:text-slate-400 p-3">
								Yes! We offer a 7-day free trial so you can explore all the
								features of Sonchoyi before committing.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							value="item-3"
							className="border-b border-slate-200 dark:border-slate-700"
						>
							<AccordionTrigger className="text-lg font-semibold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 p-3 rounded-md">
								Can I track multiple accounts?
							</AccordionTrigger>
							<AccordionContent className="text-slate-600 dark:text-slate-400 p-3">
								Absolutely! You can link multiple bank accounts, credit cards,
								and digital wallets to track all your finances in one place.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							value="item-4"
							className="border-b border-slate-200 dark:border-slate-700"
						>
							<AccordionTrigger className="text-lg font-semibold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 p-3 rounded-md">
								Is Sonchoyi secure?
							</AccordionTrigger>
							<AccordionContent className="text-slate-600 dark:text-slate-400 p-3">
								Yes! We use bank-level encryption to ensure that your personal
								and financial information is fully secure.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							value="item-5"
							className="border-b border-slate-200 dark:border-slate-700"
						>
							<AccordionTrigger className="text-lg font-semibold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 p-3 rounded-md">
								How can I get in touch for support?
							</AccordionTrigger>
							<AccordionContent className="text-slate-600 dark:text-slate-400 p-3">
								You can reach out to our support team anytime via email or
								through our live chat feature on the app.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</section>
	);
};

export default FAQSection;
