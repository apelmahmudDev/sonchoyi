export default function Header({
	title = "Place your title here",
}: {
	title: string;
}) {
	return <h1 className="text-xl md:text-2xl font-bold">{title}</h1>;
}
