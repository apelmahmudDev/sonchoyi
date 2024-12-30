import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	type?: "text" | "password" | "email" | "number";
	endAdornment?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, endAdornment, ...props }, ref) => {
		return endAdornment ? (
			<div className="relative w-full">
				<input
					type={type}
					className={cn(
						"flex h-14 w-full rounded-md border border-input bg-transparent pl-4 pr-12 py-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
						className
					)}
					ref={ref}
					{...props}
				/>
				<div className="absolute inset-y-0 right-0 pr-4 flex-shrink-0 flex items-center justify-center [&_button]:text-sm border-0 bg-transparent">
					{endAdornment}
				</div>
			</div>
		) : (
			<input
				type={type}
				className={cn(
					"flex h-14 w-full rounded-md border border-input bg-transparent px-4 py-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = "Input";

export { Input };
