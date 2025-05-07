"use client";

import { motion } from "framer-motion";

export default function Footer() {
	return (
		<footer className="bg-gradient-to-br from-[#7F3DFF] to-[#6B21A8] dark:from-[#0f172a] dark:to-[#1e293b] py-10 transition-all ease-in-out duration-300">
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
					{/* Logo Section */}
					<div className="flex flex-col items-start mb-6 sm:mb-0">
						<motion.img
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							src="/path/to/logo.png" // Replace with your logo
							alt="Sonchoyi Logo"
							className="w-32 mb-4"
						/>
						<p className="text-white text-sm opacity-80 hover:opacity-100 transition-opacity duration-300">
							Your personal finance assistant to help you budget, save, and
							grow.
						</p>
					</div>

					{/* Links Section */}
					<div className="flex flex-col items-start mb-6 sm:mb-0">
						<h3 className="text-lg font-semibold text-white mb-4 hover:text-indigo-300 transition-colors duration-300">
							Quick Links
						</h3>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="text-white opacity-80 hover:opacity-100 hover:text-indigo-300 transition-opacity duration-300"
								>
									Home
								</a>
							</li>
							<li>
								<a
									href="#features"
									className="text-white opacity-80 hover:opacity-100 hover:text-indigo-300 transition-opacity duration-300"
								>
									Features
								</a>
							</li>
							<li>
								<a
									href="#pricing"
									className="text-white opacity-80 hover:opacity-100 hover:text-indigo-300 transition-opacity duration-300"
								>
									Pricing
								</a>
							</li>
							<li>
								<a
									href="#contact"
									className="text-white opacity-80 hover:opacity-100 hover:text-indigo-300 transition-opacity duration-300"
								>
									Contact
								</a>
							</li>
						</ul>
					</div>

					{/* Social Media Section */}
					<div className="flex flex-col items-start mb-6 sm:mb-0">
						<h3 className="text-lg font-semibold text-white mb-4 hover:text-indigo-300 transition-colors duration-300">
							Follow Us
						</h3>
						<div className="flex gap-6">
							<motion.a
								href="#"
								className="text-white opacity-80 hover:opacity-100 hover:text-indigo-300 transition-opacity duration-300"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
							>
								{/* <FaFacebook size={24} /> */}
							</motion.a>
							<motion.a
								href="#"
								className="text-white opacity-80 hover:opacity-100 hover:text-indigo-300 transition-opacity duration-300"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
							>
								{/* <FaTwitter size={24} /> */}
							</motion.a>
							<motion.a
								href="#"
								className="text-white opacity-80 hover:opacity-100 hover:text-indigo-300 transition-opacity duration-300"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
							>
								{/* <FaLinkedin size={24} /> */}
							</motion.a>
							<motion.a
								href="#"
								className="text-white opacity-80 hover:opacity-100 hover:text-indigo-300 transition-opacity duration-300"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
							>
								{/* <FaInstagram size={24} /> */}
							</motion.a>
						</div>
					</div>

					{/* Copyright Section */}
					<div className="flex flex-col items-start">
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5 }}
							className="text-white text-sm opacity-80 hover:opacity-100 transition-opacity duration-300"
						>
							&copy; {new Date().getFullYear()} Sonchoyi. All rights reserved.
						</motion.p>
					</div>
				</div>
			</div>
			{/* Scroll To Top Button */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, duration: 0.3 }}
				className="absolute bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors duration-300"
				onClick={() => window.scrollTo(0, 0)}
			>
				↑
			</motion.div>
		</footer>
	);
}
