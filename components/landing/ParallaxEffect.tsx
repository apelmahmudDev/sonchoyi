import React, { useState, useEffect } from "react";

const ParallaxEffect = () => {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div style={{ height: "200vh" }}>
			<div
				style={{
					transform: `translateY(${scrollY * 0.5}px)`, // Adjust multiplier for speed
					transition: "transform 0.1s ease-out",
					background: "url(your-image.jpg) no-repeat center center",
					backgroundSize: "cover",
					height: "100vh",
				}}
			>
				<h1>Scroll-Driven Parallax</h1>
			</div>
		</div>
	);
};

export default ParallaxEffect;
