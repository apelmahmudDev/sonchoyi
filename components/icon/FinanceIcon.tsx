import * as React from "react";

interface SvgProps {
	className?: string;
}

const FinanceIcon: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="#15b79e"
		viewBox="0 -960 960 960"
		{...props}
	>
		<path d="M200-120q-33 0-56.5-23.5T120-200v-640h80v640h640v80H200Zm40-120v-360h160v360H240Zm200 0v-560h160v560H440Zm200 0v-200h160v200H640Z" />
	</svg>
);

export default FinanceIcon;
