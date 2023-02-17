import Avatar from "../common/avatar";
interface Props {
	fullname: string;
	usernameOrText: string;
	avatar: string;
}
export default function User(props: Props) {
	return (
		<div className="flex w-full gap-2 overflow-hidden ">
			<Avatar story={false} height={42} width={42} image={props.avatar} />
			<div className="flex w-full flex-col justify-center gap-[2px]">
				<span className="w-[calc(100%-60px)] truncate">
					<b>{props.fullname}</b>
				</span>
				<span className="w-[calc(100%-60px)] truncate text-neutral-500">
					{props.usernameOrText}
				</span>
			</div>
		</div>
	);
}
