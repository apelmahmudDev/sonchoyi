import * as React from "react";

interface SvgProps {
	className?: string;
}

const WalletIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={28}
		height={28}
		fill="none"
		{...props}
	>
		<path
			fill="currentColor"
			d="M20.921 7.079A4.025 4.025 0 0 0 20.125 7h-10.5a.875.875 0 0 1 0-1.75h10.5a4.375 4.375 0 0 0-3.5-1.75h-8.75a4.375 4.375 0 0 0-3.5 1.75A4.323 4.323 0 0 0 3.5 7.875v12.25A4.375 4.375 0 0 0 7.875 24.5h12.25a4.375 4.375 0 0 0 4.375-4.375v-8.75a4.376 4.376 0 0 0-3.579-4.296Zm-2.336 11.296a.878.878 0 0 1-.21 0 2.625 2.625 0 0 1 0-5.25c.299-.002.596.052.875.158a2.625 2.625 0 0 1-.665 5.075v.017Z"
			opacity={0.5}
		/>
		<path
			fill="currentColor"
			d="M18.375 16.625a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75Z"
		/>
	</svg>
);

export default WalletIcon;
