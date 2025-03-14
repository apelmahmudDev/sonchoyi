import * as React from "react";

interface SvgProps {
	className?: string;
}

const ArrowLeftIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={32}
		height={32}
		fill="none"
		{...props}
	>
		<path
			fill="#000"
			stroke="#7F3DFF"
			d="m12.237 24.84-.002-.003a.5.5 0 0 1 0-.704l5.659-5.66a3.5 3.5 0 0 0 0-4.946L12.25 7.882a.5.5 0 0 1 .703-.702l5.694 5.634a4.497 4.497 0 0 1 0 6.372l-5.66 5.65-.004.004a.5.5 0 0 1-.375.15l-.018.5.002-.5a.497.497 0 0 1-.355-.15Z"
		/>
	</svg>
);

export default ArrowLeftIcon;
