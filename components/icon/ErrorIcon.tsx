import * as React from "react";

interface SvgProps {
	className?: string;
}

const ErrorIcon: React.FC<SvgProps> = (props) => (
	<svg aria-hidden="true" viewBox="0 0 24 24" height={24} width={24} {...props}>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M7.843 3.802C9.872 2.601 10.886 2 12 2c1.114 0 2.128.6 4.157 1.802l.686.406c2.029 1.202 3.043 1.803 3.6 2.792.557.99.557 2.19.557 4.594v.812c0 2.403 0 3.605-.557 4.594-.557.99-1.571 1.59-3.6 2.791l-.686.407C14.128 21.399 13.114 22 12 22c-1.114 0-2.128-.6-4.157-1.802l-.686-.407c-2.029-1.2-3.043-1.802-3.6-2.791C3 16.01 3 14.81 3 12.406v-.812C3 9.19 3 7.989 3.557 7c.557-.99 1.571-1.59 3.6-2.792zM13 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1-9.75a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V7a.75.75 0 0 1 .75-.75"
			clipRule="evenodd"
		/>
	</svg>
);

export default ErrorIcon;
