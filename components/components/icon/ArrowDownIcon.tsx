import * as React from "react";
import { SVGProps } from "react";
const ArrowDownIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={20}
		height={9}
		fill="none"
		{...props}
	>
		<path
			fill="#000"
			stroke="#91919F"
			d="M10.006 8.41h-.012a4.5 4.5 0 0 1-3.182-1.265L1.18 1.453A.5.5 0 0 1 1.882.75l5.644 5.644.01.009a3.58 3.58 0 0 0 4.928 0l.01-.01L18.118.75a.5.5 0 0 1 .702.703l-5.632 5.692a4.5 4.5 0 0 1-3.182 1.265Z"
		/>
	</svg>
);
export default ArrowDownIcon;
