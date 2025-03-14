"use client";

import * as React from "react";
import {
	Bot,
	Gauge,
	Command,
	AudioWaveform,
	SquareTerminal,
	GalleryVerticalEnd,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

// const menuItems = [
// 	{ name: "Overview", path: "/wallet" },
// 	{ name: "Transactions", path: "/wallet/transactions" },
// 	{ name: "Income", path: "/wallet/income" },
// 	{ name: "Expenses", path: "/wallet/expenses" },
// 	{ name: "Analytics", path: "/wallet/analytics" },
// 	{ name: "Accounts", path: "/wallet/accounts" },
// 	{ name: "Settings", path: "/wallet/settings" },
// ];

// This is sample data.
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "Sonchoyi",
			logo: GalleryVerticalEnd,
			plan: "Pro",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Overview",
			url: "/my-wallet",
			icon: Gauge,
			isActive: true,
		},
		{
			title: "Ecommerce",
			url: "#",
			icon: Gauge,
		},
		{
			title: "Income",
			url: "#",
			icon: SquareTerminal,
			isActive: true,
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
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "List",
					url: "/my-wallet/expense",
					isActive: true,
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
			icon: SquareTerminal,
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
			title: "Models",
			url: "#",
			icon: Bot,
			items: [
				{
					title: "Genesis",
					url: "#",
				},
				{
					title: "Explorer",
					url: "#",
				},
				{
					title: "Quantum",
					url: "#",
				},
			],
		},
		{
			title: "Budget",
			url: "#",
			icon: Gauge,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
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
