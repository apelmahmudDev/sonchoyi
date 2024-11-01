import * as React from "react";

interface SvgProps {
	className?: string;
}

const TransactionIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={32}
		height={32}
		fill="none"
		{...props}
	>
		<path
			fill="#C6C6C6"
			d="M20.13 17.93v1a5.002 5.002 0 0 1-5 5h-3.26a3 3 0 0 1-1.68 2.61c-.41.205-.862.31-1.32.31A3 3 0 0 1 7 26.21L3.29 23.3a3 3 0 0 1 0-4.74L7 15.65a3 3 0 0 1 3.21-.34 2.86 2.86 0 0 1 1.46 1.62h7.43a1 1 0 0 1 1.03 1ZM29.87 11.07a3 3 0 0 1-1.16 2.37L25 16.35a3.09 3.09 0 0 1-1.89.65c-.458 0-.91-.105-1.32-.31a2.86 2.86 0 0 1-1.46-1.62h-7.46a1 1 0 0 1-1-1v-1a5 5 0 0 1 5-5h3.26A3 3 0 0 1 25 5.79l3.71 2.91a3 3 0 0 1 1.16 2.37Z"
		/>
	</svg>
);

export default TransactionIcon;
