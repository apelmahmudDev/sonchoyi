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
			stroke="#7F3DFF"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M16 21V5.24M8.93 11.24l5.66-5.65a2 2 0 0 1 2.82 0l5.66 5.65M27 21v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4"
		/>
	</svg>
);

export default ExportUploadIcon;
