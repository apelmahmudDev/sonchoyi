import * as React from "react";

interface SvgProps {
	className?: string;
}

const DefaultIcon: React.FC<SvgProps> = (props) => (
	<svg
		className="h-5 w-5 text-gray-500 dark:text-gray-300"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		viewBox="0 0 24 24"
		{...props}
	>
		<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
	</svg>
);

export default DefaultIcon;
