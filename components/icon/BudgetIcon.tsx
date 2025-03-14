import * as React from "react";

interface SvgProps {
	className?: string;
}

const BudgetIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={28}
		height={28}
		fill="none"
		{...props}
	>
		<path
			fill="#637381"
			d="M24.5 13.125h-9.625V3.5a10.5 10.5 0 0 1 9.625 9.625Z"
		/>
		<path
			fill="#C7CBCF"
			d="M24.5 14.875A10.5 10.5 0 1 1 13.125 3.5V14a.875.875 0 0 0 .875.875h10.5Z"
		/>
	</svg>
);

export default BudgetIcon;
