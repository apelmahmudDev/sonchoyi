import * as React from "react";

interface SvgProps {
	className?: string;
}

const ExportUploadIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={32}
		height={32}
		fill="none"
		{...props}
	>
		<path
			stroke="#FD3C4A"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M19 8V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1M11 16h15.83M23.59 11.76l2.82 2.83a2 2 0 0 1 0 2.82l-2.82 2.83"
		/>
	</svg>
);

export default ExportUploadIcon;
