import { AppLogo } from "../icon";

const Logo = () => {
	return (
		<div className="flex items-center">
			<AppLogo />
			<h1 className="text-2xl text-[#637381] font-bold ml-2 uppercase">
				Sonchoyi
			</h1>
		</div>
	);
};

export { Logo };
