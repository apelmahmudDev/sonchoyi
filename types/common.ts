export type ApiResponse<T> = {
	success: boolean;
	message?: string;
	data?: T;
};

export type ButtonProps = {
	label: string;
	onClick: () => void;
	disabled?: boolean;
};
