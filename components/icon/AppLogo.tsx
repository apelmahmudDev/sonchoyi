import * as React from "react";

interface SvgProps {
	className?: string;
}

const AppLogo: React.FC<SvgProps> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={30}
		height={31}
		fill="none"
		{...props}
	>
		<defs>
			<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="#55e098" />
				<stop offset="100%" stopColor="#00956c" />
			</linearGradient>
		</defs>
		<path
			fill="url(#gradient)"
			d="M21.715 18.198v1.898c0 1.169.947 2.115 2.115 2.115h4.543c.328 0 .595.267.595.596v4.971a2.327 2.327 0 0 1-2.327 2.327H2.327A2.327 2.327 0 0 1 0 27.778V10.516a2.327 2.327 0 0 1 2.327-2.327h24.314a2.327 2.327 0 0 1 2.327 2.327v4.971a.595.595 0 0 1-.595.595H23.83a2.115 2.115 0 0 0-2.115 2.116Z"
		/>
		<path
			fill="url(#gradient)"
			d="M29.064 16.666h-5.226c-.85 0-1.54.69-1.54 1.54v1.882c0 .85.69 1.54 1.54 1.54h5.226c.517 0 .936-.42.936-.936v-3.09a.936.936 0 0 0-.936-.936Zm-4.442 3.418a.937.937 0 1 1 0-1.874.937.937 0 0 1 0 1.874Z"
		/>
		<path
			fill="url(#gradient)"
			d="M23.518 3.484 6.393 7.663h18.643V4.676c0-.795-.745-1.38-1.518-1.192ZM21.033 3.49 3.932 7.663 18.65.139a1.227 1.227 0 0 1 1.757.797l.625 2.554Z"
		/>
	</svg>
);

export default AppLogo;
