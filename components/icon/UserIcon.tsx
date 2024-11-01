import * as React from "react";

interface SvgProps {
	className?: string;
}

const UserIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={32}
		height={32}
		fill="none"
		{...props}
	>
		<path
			fill="#C6C6C6"
			d="M16 16.07a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM19 18h-6a7 7 0 0 0-7 7 3 3 0 0 0 3 3h14a3 3 0 0 0 3-3 7 7 0 0 0-7-7Z"
		/>
	</svg>
);

export default UserIcon;
