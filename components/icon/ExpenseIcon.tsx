import * as React from "react";

interface SvgProps {
	className?: string;
}

const ExpenseIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={33}
		height={32}
		fill="none"
		{...props}
	>
		<path
			// fill="#FD3C4A"
			fill="currentColor"
			d="M23.198 14h-14a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5v-6a5 5 0 0 0-5-5Zm-7 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
		/>
		<path
			// fill="#FD3C4A"
			fill="currentColor"
			d="M16.198 24a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM16.908 2.29a1 1 0 0 0-1.42 0l-4.24 4.25A1.015 1.015 0 0 0 12.658 8l2.54-2.59V11a1 1 0 0 0 2 0V5.41L19.738 8a1 1 0 0 0 .7.29 1 1 0 0 0 .76-.29 1 1 0 0 0 0-1.41l-4.29-4.3Z"
		/>
	</svg>
);

export { ExpenseIcon };
