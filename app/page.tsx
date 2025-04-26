/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ScreenshotPreviewSection from "@/components/landing/ScreenshotPreviewSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import StatsChartSection from "@/components/landing/StatsChartSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PricingSection from "@/components/landing/PricingSection";
import ComparisonSection from "@/components/landing/ComparisonSection";
import CTASection from "@/components/landing/CTASection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

export default function HeroSection() {
	return (
		<>
			<Navbar />
			<section className="min-h-screen flex items-center justify-center bg-background px-6 py-16 transition-colors duration-300">
				<div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
					{/* Left Content */}
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center md:text-left"
					>
						<h1 className="text-5xl font-extrabold text-foreground mb-4 leading-tight">
							Manage Your <span className="text-primary">Money Smartly</span>{" "}
							<br />
							with <span className="text-accent">Sonchoyi</span>
						</h1>
						<p className="text-muted-foreground text-lg max-w-xl mb-6">
							Track every penny, create budgets like a boss, and analyze your
							spending with smooth, interactive charts.
						</p>
						<Button size="lg" className="gap-2">
							Get Started
							<ArrowRight className="w-5 h-5" />
						</Button>
					</motion.div>

					{/* Right Dashboard Preview */}

					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="relative w-full max-w-md"
					>
						{/* Glowing animated blob */}
						<div className="absolute -top-10 -left-10 w-72 h-72 bg-accent blur-3xl rounded-full opacity-30 animate-pulse z-0" />

						{/* Card preview */}
						<div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border bg-card text-card-foreground">
							<img
								src="https://img.freepik.com/premium-vector/flat-character-vector-budget-report_9206-2583.jpg"
								alt="Sonchoyi Dashboard"
								className="w-full h-auto"
							/>
						</div>

						{/* Floating card */}
						<motion.div
							initial={{ y: 40, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.5, duration: 0.6 }}
							className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl backdrop-blur-md bg-card/70 shadow-xl border text-sm font-medium text-foreground z-20"
						>
							📈 Your savings grew by 18% this month!
						</motion.div>
					</motion.div>
				</div>
			</section>
			<FeaturesSection />
			<ScreenshotPreviewSection />
			<HowItWorksSection />
			<StatsChartSection />
			<TestimonialsSection />
			<PricingSection />
			<ComparisonSection />
			<CTASection />
			<FAQSection />
			<Footer />
		</>
	);
}
