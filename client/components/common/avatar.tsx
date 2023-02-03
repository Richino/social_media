interface Props {
	image: string;
	height: number;
	width: number;
	story: boolean;
}
export default function Avatar(props: Props) {
	return (
		<div
			className={` hover:cursor-pointer shrink-0  overflow-hidden rounded-full h-[${props.height}px] w-[${props.width}px]  ${
				props.story && "p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500"
			} `}
		>
			<img src={props.image} className={`object-cover h-full w-full rounded-full ${props.story ? "p-[2px] bg-white" : null}`} alt="avatar" />
		</div>
	);
}
