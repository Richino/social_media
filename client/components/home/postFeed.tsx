"use client";
import User from "./user";
import { BsThreeDots, BsBookmark } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { IoChatbubbleOutline } from "react-icons/io5";
import { RxShare1 } from "react-icons/rx";
import { useContext } from "react";
import { App } from "../../app/context";

interface Props {
	fullname: string;
	usernameOrText: string;
	avatar: string;
	post: string;
	aspectRatio: string;
}
export default function PostFeed(props: Props) {
	const { setPost } = useContext(App);
	return (
		<div className=" w-full  rounded-lg  bg-white p-2 pb-5 tablet:phone:rounded-none tablet:phone:px-0">
			<div className="flex items-center justify-between p-3">
				<User fullname={props.fullname} usernameOrText={props.usernameOrText} avatar={props.avatar} />
				<BsThreeDots size={16} className="hover:cursor-pointer" />
			</div>
			<div className={`relative w-full overflow-hidden rounded hover:cursor-pointer tablet:phone:rounded-none ${props.aspectRatio}`} onClick={() => setPost(true)}>
				<img src={props.post} alt="post" style={{ objectFit: "cover" }} className={`h-full`} />
			</div>
			<div className="flex items-center justify-between p-3 py-2">
				<div className="flex gap-2">
					<AiFillHeart size={22} color="#7c3aed" />
					<IoChatbubbleOutline size={20} />
					<RxShare1 size={20} />
				</div>
				<BsBookmark size={16} />
			</div>
			<div className="px-3">
				<span>
					<b>500</b> Likes
				</span>
			</div>
			<div className="px-3 pt-2">
				<span>
					<b>Joseph </b>
					<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus magna et ornare porta. Proin id suscipit erat. In dictum mauris eget euismod cursus</span>
				</span>
			</div>
			<button className="px-3 pt-2 text-neutral-500">View all 45 comments</button>
		</div>
	);
}
