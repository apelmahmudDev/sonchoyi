import * as React from "react";

interface SvgProps {
	className?: string;
}

const TutorIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="#b980ff"
		viewBox="0 -960 960 960"
		{...props}
	>
		<path d="M840-280v-276L480-360 40-600l440-240 440 240v320h-80ZM480-120 200-272v-200l280 152 280-152v200L480-120Z" />
	</svg>
);

export default TutorIcon;
