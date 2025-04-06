import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ChevronRightIcon } from "./icon";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: React.ElementType;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
			isActive?: boolean;
		}[];
	}[];
}) {
	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) =>
						item.items ? ( // Check if the item has subitems
							<Collapsible
								key={item.title}
								asChild
								defaultOpen={item.isActive}
								className="group/collapsible"
							>
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton
											size="lg"
											isActive={item.isActive}
											tooltip={item.title}
										>
											{item.icon && <item.icon />}
											<span>{item.title}</span>
											<ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:right-1 group-data-[collapsible=icon]:top-[14px]" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.items.map((subItem) => (
												<SidebarMenuSubItem key={subItem.title}>
													<SidebarMenuSubButton
														isActive={subItem.isActive}
														asChild
													>
														<Link href={subItem.url}>
															<span>{subItem.title}</span>
														</Link>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						) : (
							// Handle normal item without subitems
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									asChild
									size="lg"
									isActive={item.isActive}
									tooltip={item.title}
								>
									<Link href={item.url}>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						)
					)}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
