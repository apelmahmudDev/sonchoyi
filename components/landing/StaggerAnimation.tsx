import { motion } from "framer-motion";

const StaggerAnimation = () => {
	const items = [1, 2, 3, 4, 5];

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={{
				hidden: { opacity: 0 },
				visible: {
					opacity: 1,
					transition: {
						staggerChildren: 0.3, // Stagger items' appearance
					},
				},
			}}
		>
			{items.map((item) => (
				<motion.div
					key={item}
					variants={{
						hidden: { opacity: 0 },
						visible: { opacity: 1 },
					}}
					style={{
						background: "#333",
						margin: "10px 0",
						padding: "20px",
						color: "white",
					}}
				>
					Item {item}
				</motion.div>
			))}
		</motion.div>
	);
};

export default StaggerAnimation;
