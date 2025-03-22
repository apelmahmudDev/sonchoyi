import * as React from "react";

interface SvgProps {
	className?: string;
}

const CurrencyExchangeIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={32}
		height={32}
		fill="none"
		{...props}
	>
		<path
			fill="currentColor"
			d="M10 28a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM22 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM6.16 14a.791.791 0 0 0 .3.05 1 1 0 0 0 1-.7A9.001 9.001 0 0 1 12 8v1a1 1 0 0 0 2 0V5a1 1 0 0 0-1-1H9a1 1 0 1 0 0 2h2.42a11 11 0 0 0-5.92 6.7 1 1 0 0 0 .66 1.3ZM19 22a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 1 0 0-2h-2.43a11.001 11.001 0 0 0 6.21-7.8 1.019 1.019 0 1 0-2-.4A9 9 0 0 1 20 24.05V23a1 1 0 0 0-1-1Z"
		/>
	</svg>
);

export default CurrencyExchangeIcon;
