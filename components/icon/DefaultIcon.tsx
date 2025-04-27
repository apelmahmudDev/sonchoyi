import * as React from "react";

interface SvgProps {
	className?: string;
}

const DefaultIcon: React.FC<SvgProps> = (props) => (
	// <svg
	// 	xmlns="http://www.w3.org/2000/svg"
	// 	width={30}
	// 	height={30}
	// 	viewBox="0 0 40 40"
	// 	preserveAspectRatio="xMidYMid meet"
	// 	fill="none"
	// 	{...props}
	// >
	// 	<path
	// 		fill="#FD3C4A"
	// 		d="M27.5 5a6.25 6.25 0 0 0-6.25 6.25v2.5a6.25 6.25 0 0 0 5 6.125v2.85a3.75 3.75 0 0 0-2.5 3.525v5a3.75 3.75 0 0 0 7.5 0v-5a3.75 3.75 0 0 0-2.5-3.525v-2.85a6.25 6.25 0 0 0 5-6.125v-2.5A6.25 6.25 0 0 0 27.5 5ZM17.5 5a1.25 1.25 0 0 0-1.25 1.25v5a1.25 1.25 0 0 1-2.5 0v-5a1.25 1.25 0 0 0-2.5 0v5a1.25 1.25 0 0 1-2.5 0v-5a1.25 1.25 0 0 0-2.5 0v7.5a6.25 6.25 0 0 0 5 6.125v2.85a3.75 3.75 0 0 0-2.5 3.525v5a3.75 3.75 0 0 0 7.5 0v-5a3.75 3.75 0 0 0-2.5-3.525v-2.85a6.25 6.25 0 0 0 5-6.125v-7.5A1.25 1.25 0 0 0 17.5 5Z"
	// 	/>
	// </svg>
	<svg
		className="h-5 w-5 text-gray-500 dark:text-gray-300"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		viewBox="0 0 24 24"
	>
		<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
	</svg>
);

export default DefaultIcon;
