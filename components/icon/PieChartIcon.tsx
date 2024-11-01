import * as React from "react";

interface SvgProps {
	className?: string;
}

const PieChartIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={32}
		height={32}
		fill="none"
		{...props}
	>
		<path fill="#C6C6C6" d="M28 15H17V4a12 12 0 0 1 11 11Z" />
		<path fill="#C6C6C6" d="M28 17A12 12 0 1 1 15 4v12a1 1 0 0 0 1 1h12Z" />
	</svg>
);

export { PieChartIcon };
