interface Props {
	placeholder: string;
	type: string;
}
export default function Search(props: Props) {
	return (
		<div className="flex  items-center justify-center overflow-hidden rounded-full bg-neutral-100">
			<div className="shrink-0 px-3 hover:cursor-pointer">
				<img src={"/assets/icons/search.svg"} alt="search icon" className="h-4" />
			</div>
			<input className="w-full bg-neutral-100 p-2 placeholder:text-neutral-400" placeholder={props.placeholder} />
		</div>
	);
}
