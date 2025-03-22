import { cn } from "@/lib/utils";
import Link from "next/link";
import { Fragment } from "react";

interface BreadcrumbLink {
	label: string;
	to?: string;
}

interface BreadcrumbProps {
	breadcrumbLinks: BreadcrumbLink[];
	className?: string;
}

export default function Breadcrumb({
	breadcrumbLinks,
	className,
}: BreadcrumbProps) {
	return (
		<nav className={cn(className)}>
			<ol role="list" className="flex items-center gap-3">
				{breadcrumbLinks.map((link) =>
					link.to ? (
						<Fragment key={link.label}>
							<li className="text-sm hover:underline underline-offset-4">
								<Link href={link.to}>{link.label}</Link>
							</li>
							<span className="h-1 w-1 bg-dark-25 rounded-full"></span>
						</Fragment>
					) : (
						<li key={link.label} className="text-sm text-dark-25">
							<div>{link.label}</div>
						</li>
					)
				)}
			</ol>
		</nav>
	);
}
