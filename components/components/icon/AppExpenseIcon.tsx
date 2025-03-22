import * as React from "react";

interface SvgProps {
	className?: string;
}

const AppExpenseIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={28}
		height={28}
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
			d="M14 21a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5ZM14.621 2.004a.876.876 0 0 0-1.242 0l-3.71 3.719A.888.888 0 0 0 10.902 7l2.223-2.266v4.891a.875.875 0 0 0 1.75 0V4.734L17.098 7a.875.875 0 0 0 .612.254.875.875 0 0 0 .665-.254.875.875 0 0 0 0-1.234l-3.754-3.762Z"
		/>
	</svg>
);

export default AppExpenseIcon;
