import * as React from "react";

interface SvgProps {
	className?: string;
}

const UtilitiesIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="#38BDF8"
		viewBox="0 -960 960 960"
		className="size-6"
		{...props}
	>
		<path d="M160-160q-33 0-56.5-23.5T80-240v-160h200v40h80v-40h240v40h80v-40h200v160q0 33-23.5 56.5T800-160H160ZM97-480l83-192q9-22 29-35t43-13h28v-40q0-33 23.5-56.5T360-840h240q33 0 56.5 23.5T680-760v40h28q23 0 43 13t29 35l83 192H680v-40h-80v40H360v-40h-80v40H97Zm263-240h240v-40H360v40Z" />
	</svg>
);

export default UtilitiesIcon;
