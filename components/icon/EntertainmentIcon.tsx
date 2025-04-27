import * as React from "react";

interface SvgProps {
	className?: string;
}

const EntertainmentIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="#F59E0B"
		viewBox="0 -960 960 960"
		className="size-6"
		{...props}
	>
		<path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Z" />
	</svg>
);

export default EntertainmentIcon;
