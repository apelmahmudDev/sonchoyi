import { EyeIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
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
