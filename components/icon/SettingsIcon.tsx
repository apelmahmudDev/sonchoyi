import * as React from "react";

interface SvgProps {
	className?: string;
}

const SettingsIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={32}
		height={32}
		fill="none"
		{...props}
	>
		<path fill="#7F3DFF" d="M16 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
		<path
			fill="#7F3DFF"
			d="m25.79 17-.38-.23a.94.94 0 0 1 0-1.62l.38-.23a3 3 0 0 0 1.1-4.09l-1-1.74A3 3 0 0 0 21.79 8l-.32.18A1 1 0 0 1 20 7.36V7a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v.36a1 1 0 0 1-1.48.86L10.21 8a3 3 0 0 0-4.1 1.09l-1 1.74A3 3 0 0 0 6.21 15l.38.23a.94.94 0 0 1 0 1.62l-.38.15a3 3 0 0 0-1.1 4.09l1 1.74a2.999 2.999 0 0 0 4.1 1.17l.31-.17a1 1 0 0 1 1 0 1 1 0 0 1 .49.84V25a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-.37a1 1 0 0 1 1.5-.84l.31.18a3 3 0 0 0 4.1-1.09l1-1.74A3.002 3.002 0 0 0 25.79 17ZM16 20a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
		/>
	</svg>
);

export default SettingsIcon;
