interface Props {
	placeholder: string;
	type: string;
}
export default function Search(props: Props) {
	return (
		<div className="bg-neutral-100  flex items-center justify-center rounded-full overflow-hidden">
			<div className="px-3 hover:cursor-pointer shrink-0">
				<img src={"/assets/icons/search.svg"} alt="search icon" className="h-4" />
			</div>
			<input className="p-2 bg-neutral-100 placeholder:text-neutral-400 w-full" placeholder={props.placeholder} />
		</div>
	);
}
