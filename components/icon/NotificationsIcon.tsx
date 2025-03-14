import * as React from "react";

interface SvgProps {
	className?: string;
}

const NotificationIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={32}
		height={32}
		fill="none"
		{...props}
	>
		<path
			fill="#7F3DFF"
			d="M26 21.5a3.09 3.09 0 0 1-3.11 2.5H9.11A3.09 3.09 0 0 1 6 21.5a3 3 0 0 1 1.52-3.13.93.93 0 0 0 .48-.83V14a8 8 0 0 1 5-7.43 3 3 0 0 1 6 .03 8.36 8.36 0 0 1 5 7.69v3.25a.93.93 0 0 0 .44.83A3 3 0 0 1 26 21.5ZM16 28a4 4 0 0 0 3.44-2h-6.88A4 4 0 0 0 16 28Z"
		/>
	</svg>
);

export default NotificationIcon;
