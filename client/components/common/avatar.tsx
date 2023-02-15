interface Props {
	image: string;
	height: number;
	width: number;
	story: boolean;
}
export default function Avatar(props: Props) {
	return (
		<div
			className={`shrink-0 overflow-hidden  rounded-full hover:cursor-pointer h-[${props.height}px] w-[${props.width}px]  ${
				props.story && "bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 p-[2px]"
			} `}>
			<img src={props.image} className={`h-full w-full rounded-full object-cover ${props.story ? "bg-white p-[2px]" : null}`} alt="avatar" />
		</div>
	);
}
