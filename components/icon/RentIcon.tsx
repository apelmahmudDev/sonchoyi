import * as React from "react";

interface SvgProps {
	className?: string;
}

const RentIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
		viewBox="0 -960 960 960"
		className="size-6"
		{...props}
	>
		<path d="M160-120v-375l-72 55-48-64 120-92v-124h80v63l240-183 440 336-48 63-72-54v375H520v-240h-80v240H160Zm0-640q0-50 35-85t85-35q17 0 28.5-11.5T320-920h80q0 50-35 85t-85 35q-17 0-28.5 11.5T240-760h-80Z" />
	</svg>
);

export default RentIcon;
