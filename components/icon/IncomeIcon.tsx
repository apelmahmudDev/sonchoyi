import * as React from "react";

interface SvgProps {
	className?: string;
}

const IncomeIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={32}
		height={32}
		fill="none"
		{...props}
	>
		<path
			fill="#00A86B"
			d="M23 14H9a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5v-6a5 5 0 0 0-5-5Zm-7 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
		/>
		<path
			fill="#00A86B"
			d="M16 24a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM16 2a1 1 0 0 0-1 1v5.59l-2.54-2.54a1 1 0 0 0-1.41 1.41l4.24 4.25c.092.09.2.161.32.21a1 1 0 0 0 .78 0 .998.998 0 0 0 .32-.21L21 7.46a1 1 0 0 0-1.41-1.41L17 8.59V3a1 1 0 0 0-1-1Z"
		/>
	</svg>
);

export { IncomeIcon };
