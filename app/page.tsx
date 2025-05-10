import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import ScreenshotPreview from "@/components/landing/screenshot-preview";
import HowItWorksSection from "@/components/landing/how-it-works";
import StatsChart from "@/components/landing/stats-chart";
import Testimonials from "@/components/landing/testimonials";
import Pricing from "@/components/landing/pricing";
import Comparison from "@/components/landing/comparison";
import CTA from "@/components/landing/cta";
import FAQSection from "@/components/landing/faq-section";
import Navbar from "@/components/landing/navbar";

export default function HomePage() {
	return (
		<>
			<Navbar/>
			<Hero />
			<Features />
			<ScreenshotPreview />
			<HowItWorksSection />
			<StatsChart />
			<Testimonials />
			<Pricing />
			<Comparison />
			<CTA />
			<FAQSection />
		</>
	);
}
