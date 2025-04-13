import * as React from "react";

interface SvgProps {
	className?: string;
}

const HamburgerMenuIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		aria-hidden="true"
		viewBox="0 0 24 24"
		{...props}
	>
		<path
			fill="currentColor"
			d="M15.78 4.5H5.22c-.948 0-1.72.56-1.72 1.25S4.272 7 5.22 7h10.56c.948 0 1.72-.56 1.72-1.25s-.772-1.25-1.72-1.25Z"
			opacity={0.4}
		/>
		<path
			fill="currentColor"
			d="M18.78 10.75H8.22c-.948 0-1.72.56-1.72 1.25s.772 1.25 1.72 1.25h10.56c.948 0 1.72-.56 1.72-1.25s-.772-1.25-1.72-1.25ZM15.78 17H5.22c-.948 0-1.72.56-1.72 1.25s.772 1.25 1.72 1.25h10.56c.948 0 1.72-.56 1.72-1.25S16.728 17 15.78 17Z"
		/>
	</svg>
);

export default HamburgerMenuIcon;
