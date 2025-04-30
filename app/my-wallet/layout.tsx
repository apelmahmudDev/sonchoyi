import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/dashboard-header";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="font-[family-name:var(--font-inter)] w-full">
				<DashboardHeader />
				<div className="max-w-[1456px] mx-auto px-4 xl:px-10 pt-2 pb-12">
					{children}
				</div>
			</main>
		</SidebarProvider>
	);
}
