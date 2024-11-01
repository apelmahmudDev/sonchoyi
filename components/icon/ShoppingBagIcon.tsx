import * as React from "react";

interface SvgProps {
	className?: string;
}

const ShoppingBagIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={40}
		height={40}
		fill="none"
		{...props}
	>
		<path
			fill="#FCAC12"
			d="M31.25 25H8.225l1 5a6.25 6.25 0 0 0 6.125 5h9.3a6.25 6.25 0 0 0 6.125-5l1-5h-.525Zm-12.5 6.25a1.25 1.25 0 0 1-2.5 0v-2.5a1.25 1.25 0 0 1 2.5 0v2.5Zm5 0a1.25 1.25 0 0 1-2.5 0v-2.5a1.25 1.25 0 0 1 2.5 0v2.5ZM31.25 12.5h-2.5v-1.25A6.25 6.25 0 0 0 22.5 5h-5a6.25 6.25 0 0 0-6.25 6.25v1.25h-2.5A3.75 3.75 0 0 0 5 16.25v2.5a3.75 3.75 0 0 0 3.75 3.75h22.5A3.75 3.75 0 0 0 35 18.75v-2.5a3.75 3.75 0 0 0-3.75-3.75Zm-17.5-1.25A3.75 3.75 0 0 1 17.5 7.5h5a3.75 3.75 0 0 1 3.75 3.75v1.25h-12.5v-1.25Z"
		/>
	</svg>
);

export default ShoppingBagIcon;
