import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

interface AvatarProps {
	source: StaticImageData;
	className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ source, className }) => {
	return (
		<div
			className={cn(
				"border-2 border-[#7F3DFF] rounded-full h-[50px] w-[50px] overflow-hidden p-1",
				className
			)}
		>
			<Image
				className="h-full w-full rounded-full object-cover"
				src={source}
				alt="user-name"
			/>
		</div>
	);
};

export default Avatar;
