import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { SidebarTrigger } from "./ui/sidebar";
import { NotificationIcon, SettingsIcon } from "./icon";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function DashboardHeader() {
	return (
		<header className="sticky top-0 left-auto right-0 w-full shrink-0 bg-none bg-transparent before:absolute before:content-[''] before-bg-dashboard-header before:w-full before:h-full before:top-0 before:left-0 z-10 before:-z-[1] before:backdrop-blur-[6px]">
			<nav className="h-[72px] flex items-center justify-between px-10">
				<div>
					<SidebarTrigger />
				</div>
				<div className="flex items-center gap-2">
					<ModeToggle />
					<Button variant="icon" size="icon">
						<NotificationIcon />
					</Button>
					<Button variant="icon" size="icon">
						<SettingsIcon />
					</Button>
					<Avatar className="hover:scale-[1.05] transition duration-300 ease-in-out size-[40px] border-1 border-primary/65 hover:border-primary/100 rounded-full p-0.5">
						<AvatarImage
							className="rounded-full"
							src="https://github.com/shadcn.png"
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</div>
			</nav>
		</header>
	);
}
