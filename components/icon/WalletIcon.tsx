import * as React from "react";

interface SvgProps {
	className?: string;
}

const WalletIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={32}
		height={32}
		fill="none"
		{...props}
	>
		<path
			fill="#7F3DFF"
			d="M23.91 8.09A4.6 4.6 0 0 0 23 8H11a1 1 0 0 1 0-2h12a5 5 0 0 0-4-2H9a5 5 0 0 0-4 2 4.94 4.94 0 0 0-1 3v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V13a5 5 0 0 0-4.09-4.91ZM21.24 21c-.08.01-.16.01-.24 0a3 3 0 0 1 0-6 2.77 2.77 0 0 1 1 .18 3 3 0 0 1-.76 5.8V21Z"
		/>
		<path fill="#7F3DFF" d="M21 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
	</svg>
);

export default WalletIcon;
