import { EyeIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectValue,
	SelectTrigger,
	SelectItem,
	SelectLabel,
	SelectGroup,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default async function IncomePage() {
	return (
		<div className="p-10 sm:p-20 space-y-20">
			{/* Button */}
			<div>
				<div className="mb-5">
					<h1 className="mb-1 text-2xl font-semibold">Button</h1>
					<p>Displays a button or a component that looks like a button.</p>
				</div>
				<div className="gap-4 flex flex-wrap">
					<Button>Default</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="destructive">Destructive</Button>
					<Button variant="link">Link</Button>
					<Button variant="outline">Outline</Button>
				</div>
			</div>
			<div>
				<div className="mb-5">
					<h1 className="mb-1 text-2xl font-semibold">Forms</h1>
					<p>Building forms with React Hook Form and Zod.</p>
				</div>
				<div className="gap-4 flex flex-wrap">
					<Input />
					<Input placeholder="Input..." />
					<Input
						type="password"
						placeholder="Password"
						endAdornment={
							<button>
								<EyeIcon />
							</button>
						}
					/>
					<Select>
						<SelectTrigger className="w-[280px]">
							<SelectValue placeholder="Select a timezone" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>North America</SelectLabel>
								<SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
								<SelectItem value="cst">Central Standard Time (CST)</SelectItem>
								<SelectItem value="mst">
									Mountain Standard Time (MST)
								</SelectItem>
								<SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
								<SelectItem value="akst">
									Alaska Standard Time (AKST)
								</SelectItem>
								<SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
							</SelectGroup>
							<SelectGroup>
								<SelectLabel>Europe & Africa</SelectLabel>
								<SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
								<SelectItem value="cet">Central European Time (CET)</SelectItem>
								<SelectItem value="eet">Eastern European Time (EET)</SelectItem>
								<SelectItem value="west">
									Western European Summer Time (WEST)
								</SelectItem>
								<SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
								<SelectItem value="eat">East Africa Time (EAT)</SelectItem>
							</SelectGroup>
							<SelectGroup>
								<SelectLabel>Asia</SelectLabel>
								<SelectItem value="msk">Moscow Time (MSK)</SelectItem>
								<SelectItem value="ist">India Standard Time (IST)</SelectItem>
								<SelectItem value="cst_china">
									China Standard Time (CST)
								</SelectItem>
								<SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
								<SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
								<SelectItem value="ist_indonesia">
									Indonesia Central Standard Time (WITA)
								</SelectItem>
							</SelectGroup>
							<SelectGroup>
								<SelectLabel>Australia & Pacific</SelectLabel>
								<SelectItem value="awst">
									Australian Western Standard Time (AWST)
								</SelectItem>
								<SelectItem value="acst">
									Australian Central Standard Time (ACST)
								</SelectItem>
								<SelectItem value="aest">
									Australian Eastern Standard Time (AEST)
								</SelectItem>
								<SelectItem value="nzst">
									New Zealand Standard Time (NZST)
								</SelectItem>
								<SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
							</SelectGroup>
							<SelectGroup>
								<SelectLabel>South America</SelectLabel>
								<SelectItem value="art">Argentina Time (ART)</SelectItem>
								<SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
								<SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
								<SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div>
				<div className="mb-5">
					<h1 className="mb-1 text-2xl font-semibold">Forms</h1>
					<p>Building forms with React Hook Form and Zod.</p>
				</div>
				<div className="gap-4 flex flex-wrap">{/* Example components */}</div>
			</div>
		</div>
	);
}
