import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { NotificationIcon, SettingsIcon } from "./icon";
import { SidebarArrowTrigger, SidebarTrigger } from "./ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function DashboardHeader() {
	return (
		<header className="sticky top-0 z-10 w-full backdrop-blur-md bg-background/80 dark:backdrop-blur-sm dark:bg-background/90">
			<nav className="h-[72px] flex items-center justify-between px-4 md:px-10">
				<div className="flex items-center">
					<SidebarArrowTrigger />
					<SidebarTrigger />
				</div>
				<div className="flex items-center gap-2">
					<ModeToggle />
					<Button variant="icon" size="icon">
						<NotificationIcon className="text-foreground" />
					</Button>
					<Button variant="icon" size="icon">
						<SettingsIcon className="text-foreground" />
					</Button>
					<Avatar className="hover:scale-[1.05] transition duration-300 ease-in-out size-10 border border-primary/65 hover:border-primary rounded-full p-0.5">
						<AvatarImage
							className="rounded-full"
							src="https://github.com/shadcn.png"
						/>
						<AvatarFallback className="text-foreground bg-muted">
							CN
						</AvatarFallback>
					</Avatar>
				</div>
			</nav>
		</header>
	);
}
// export default function DashboardHeader() {
// 	return (
// 		<header className="sticky top-0 z-30 w-full bg-transparent backdrop-blur-md before:absolute before:inset-0 before:z-[-1] before:bg-dashboard-header before:backdrop-blur-[6px]">
// 			<nav className="h-[72px] flex items-center justify-between px-4 md:px-10">
// 				<div className="flex items-center gap-2">
// 					<SidebarArrowTrigger />
// 					<SidebarTrigger /> {/* Mobile sidebar trigger */}
// 				</div>
// 				<div className="flex items-center gap-3">
// 					<ModeToggle />
// 					<Button variant="icon" size="icon">
// 						<NotificationIcon />
// 					</Button>
// 					<Button variant="icon" size="icon">
// 						<SettingsIcon />
// 					</Button>
// 					<Avatar className="size-10 border border-primary/60 hover:border-primary/90 rounded-full transition-transform hover:scale-105 duration-300 ease-in-out">
// 						<AvatarImage
// 							className="rounded-full"
// 							src="https://github.com/shadcn.png"
// 							alt="Profile"
// 						/>
// 						<AvatarFallback>CN</AvatarFallback>
// 					</Avatar>
// 				</div>
// 			</nav>
// 		</header>
// 	);
// }
