import Avatar from "../common/avatar";
interface Props {
	fullname: string;
	usernameOrText: string;
	avatar: string;
}
export default function User(props: Props) {
	return (
		<div className="flex gap-2 w-full overflow-hidden ">
			<Avatar story={false} height={42} width={42} image={props.avatar} />
			<div className="flex flex-col justify-center gap-[2px] w-full">
				<span className="truncate w-[calc(100%-60px)]">
					<b>{props.fullname}</b>
				</span>
				<span className="text-neutral-500 truncate w-[calc(100%-60px)]">{props.usernameOrText}</span>
			</div>
		</div>
	);
}
