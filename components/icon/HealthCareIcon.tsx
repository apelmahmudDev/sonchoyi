import * as React from "react";

interface SvgProps {
	className?: string;
}

const HealthCareIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="#d94b44"
		viewBox="0 -960 960 960"
		{...props}
	>
		<path d="M420-340h120v-100h100v-120H540v-100H420v100H320v120h100v100Zm60 260q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Z" />
	</svg>
);

export default HealthCareIcon;
