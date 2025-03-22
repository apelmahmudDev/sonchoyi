"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

import {
	AppExpenseIcon,
	AppIncomeIcon,
	BudgetIcon,
	DashboardIcon,
	WalletIcon,
} from "./icon";
import Link from "next/link";
import { Logo } from "./ui/logo";

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Overview",
			url: "/my-wallet",
			icon: DashboardIcon,
			isActive: true,
		},
		{
			title: "Income",
			url: "#",
			icon: AppIncomeIcon,
			isActive: false,
			items: [
				{
					title: "List",
					url: "/my-wallet/income",
					isActive: true,
				},
				{
					title: "Create",
					url: "/my-wallet/income/create",
				},
			],
		},
		{
			title: "Expense",
			url: "#",
			icon: AppExpenseIcon,
			isActive: false,
			items: [
				{
					title: "List",
					url: "/my-wallet/expense",
					isActive: false,
				},
				{
					title: "Create",
					url: "/my-wallet/expense/create",
				},
			],
		},
		{
			title: "Account",
			url: "#",
			icon: WalletIcon,
			items: [
				{
					title: "List",
					url: "/my-wallet/account",
					isActive: true,
				},
				{
					title: "Create",
					url: "/my-wallet/account/create",
				},
			],
		},
		{
			title: "Budget",
			url: "#",
			icon: BudgetIcon,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<Link href="/">
					<div className="ml-2 my-3">
						<Logo />
					</div>
				</Link>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
