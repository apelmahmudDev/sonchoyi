import * as React from "react";

interface SvgProps {
	className?: string;
}

const EditIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={32}
		height={32}
		fill="none"
		{...props}
	>
		<path
			stroke="#212325"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="m25.19 12.46-12 12a2.06 2.06 0 0 1-1 .54l-3.54.71a2 2 0 0 1-2.35-2.35l.7-3.51a2.06 2.06 0 0 1 .54-1L19.38 7a4.15 4.15 0 0 1 5.94 0 4 4 0 0 1-.13 5.51v-.05Z"
		/>
	</svg>
);

export default EditIcon;
