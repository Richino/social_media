import Image from "next/image";

interface Props {
	image: string;
	height?: number | 60;
	width: number;
	story: boolean;
}
export default function Avatar(props: Props) {
	return (
		<div
			className={`relative rounded-full ${
				props.story && "bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 p-[2px]"
			}`}>
			<div
				className={`relative shrink-0  overflow-hidden min-h-[${props.height}px]  rounded-full border-[2px] border-white hover:cursor-pointer h-[${props.height}px] w-[${props.width}px] `}>
				<Image
					src={props.image}
					alt="avatar"
					fill
					style={{ objectFit: "cover" }}
					sizes="(max-width: 56px) 100vw"
				/>
			</div>
		</div>
	);
}
