"use client";
import "./Carousel.css";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const carouselData = [
	{
		title1: "Gain total control",
		title2: "of your money",
		subtitle: "Become your own money manager and make every cent count",
	},
	{
		title1: "Know where your",
		title2: "money goes",
		subtitle:
			"Track your transaction easily, with categories and financial report",
	},
	{
		title1: "Planning ahead",
		subtitle: "Setup your budget for each category so you in control",
	},
];
const Carousel = () => {
	return (
		<div className="image-carousel-container px-12">
			<Swiper
				pagination={{
					clickable: true,
				}}
				modules={[Navigation, Autoplay, Pagination]}
				autoplay={{ delay: 5000, disableOnInteraction: false }}
				className="mySwiper"
			>
				{carouselData?.map((slide, index) => (
					<SwiperSlide key={index}>
						<div className="grid gap-4 grid-cols-1 md:grid-cols-2 slide-info">
							<div className="place-content-center">
								<h2 className="mb-2 text-3xl font-bold uppercase text-[#FCAC12]">
									{slide.title1}
								</h2>
								<h2 className="text-5xl font-bold uppercase text-[#FCAC12]">
									{slide.title2}
								</h2>
								<p>{slide.subtitle}</p>
								<div className="line">
									<div className="progressbar"></div>
								</div>
								<div className="mt-10 flex gap-4">
									<Link href="/login">
										<Button>Login</Button>
									</Link>
									<Link href="/signup">
										<Button>Sign Up</Button>
									</Link>
								</div>
							</div>
							{/* <div className="place-content-center">
								<img src={bg.src} alt="bg" />
							</div> */}
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default Carousel;
