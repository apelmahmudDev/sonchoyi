import * as React from "react";

interface SvgProps {
	className?: string;
}

const TransportationIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={30}
		height={30}
		viewBox="0 0 40 40"
		preserveAspectRatio="xMidYMid meet"
		fill="none"
		{...props}
	>
		<path
			fill="#07F"
			d="M33.75 17.5h-1.887a1.25 1.25 0 0 1-1.25-.887l-2.1-7.163A6.25 6.25 0 0 0 22.5 5H12.138a6.25 6.25 0 0 0-5.8 3.925l-3.563 8.913c-.184.443-.278.92-.275 1.4V25a6.25 6.25 0 0 0 5.138 6.15 5 5 0 0 0 9.7.1h5.325a5 5 0 0 0 9.675 0h1.412a3.75 3.75 0 0 0 3.75-3.75v-6.25a3.75 3.75 0 0 0-3.75-3.75Zm-21.25 15a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm6.25-15H5.588L8.65 9.863A3.75 3.75 0 0 1 12.138 7.5h6.612v10Zm2.5 0v-10h1.25a3.75 3.75 0 0 1 3.625 2.675l2.138 7.15c.02.06.044.12.075.175H21.25Zm6.25 15a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5ZM35 25h-1.25a1.25 1.25 0 1 1 0-2.5H35V25Z"
		/>
	</svg>
);

export default TransportationIcon;
