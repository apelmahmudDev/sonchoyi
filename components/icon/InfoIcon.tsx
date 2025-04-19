import * as React from "react";

interface SvgProps {
	className?: string;
}

const InfoIcon: React.FC<SvgProps> = (props) => (
	<svg
		aria-hidden="true"
		className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-mz9m0q"
		viewBox="0 0 24 24"
		width={24}
		height={24}
		{...props}
	>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10m-10 5.75a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75M12 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
			clipRule="evenodd"
		/>
	</svg>
);

export default InfoIcon;
