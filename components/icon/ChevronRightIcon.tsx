import * as React from "react";

interface SvgProps {
	className?: string;
}

const ChevronRightIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={16}
		height={16}
		fill="none"
		{...props}
	>
		<path
			fill="#637381"
			d="M6.295 12.745a.501.501 0 0 1-.355-.855l2.83-2.83a1.5 1.5 0 0 0 0-2.12L5.94 4.11a.5.5 0 0 1 .705-.705L9.5 6.23a2.5 2.5 0 0 1 0 3.54l-2.83 2.825a.501.501 0 0 1-.375.15Z"
		/>
	</svg>
);

export default ChevronRightIcon;
