import * as React from "react";

interface SvgProps {
	className?: string;
}

const AppIncomeIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={28}
		height={28}
		viewBox="0 0 28 28"
		fill="none"
		{...props}
	>
		<path
			fill="currentColor"
			d="M20.125 12.25H7.875A4.375 4.375 0 0 0 3.5 16.625v5.25a4.375 4.375 0 0 0 4.375 4.375h12.25a4.375 4.375 0 0 0 4.375-4.375v-5.25a4.375 4.375 0 0 0-4.375-4.375ZM14 22.75a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"
			opacity={0.5}
		/>
		<path
			fill="currentColor"
			d="M14 21a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5ZM14 1.75a.875.875 0 0 0-.875.875v4.891l-2.223-2.222A.875.875 0 0 0 9.67 6.528l3.71 3.718c.08.079.176.141.28.184a.875.875 0 0 0 .682 0 .876.876 0 0 0 .28-.184l3.754-3.719a.875.875 0 0 0-1.234-1.233l-2.266 2.222V2.625A.875.875 0 0 0 14 1.75Z"
		/>
	</svg>
);

export default AppIncomeIcon;
