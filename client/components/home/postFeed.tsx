"use client";
import User from "./user";
import { BsThreeDots, BsBookmark } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { IoChatbubbleOutline } from "react-icons/io5";
import { RxShare1 } from "react-icons/rx";
import { useContext } from "react";
import { PostContext } from "../../app/context";

interface Props {
	fullname: string;
	usernameOrText: string;
	avatar: string;
	post: string;
	aspectRatio: string;
}
export default function PostFeed(props: Props) {
	const { setPost } = useContext(PostContext);
	return (
		<div className=" bg-white  rounded-lg  p-2 pb-5 w-full tablet:phone:px-0 tablet:phone:rounded-none">
			<div className="flex justify-between items-center p-3">
				<User fullname={props.fullname} usernameOrText={props.usernameOrText} avatar={props.avatar} />
				<BsThreeDots size={16} className="hover:cursor-pointer" />
			</div>
			<div className={`relative w-full rounded overflow-hidden hover:cursor-pointer tablet:phone:rounded-none ${props.aspectRatio}`} onClick={() => setPost(true)}>
				<img src={props.post} alt="post" style={{ objectFit: "cover" }} className={`h-full`} />
			</div>
			<div className="p-3 py-2 flex justify-between items-center">
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
