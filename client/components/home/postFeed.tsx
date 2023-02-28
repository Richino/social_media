"use client";
import User from "./user";
import { BsThreeDots, BsBookmark } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoChatbubbleOutline } from "react-icons/io5";
import { RxShare1 } from "react-icons/rx";
import { useContext, useState } from "react";
import { App } from "../../app/context";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

interface Props {
	fullname: string;
	usernameOrText: string;
	avatar: string;
	post: string;
	caption: string;
	likes: Array<string>;
	comments: Array<Object>;
	id: string;
	author: string;
	index: number;
}
export default function PostFeed(props: Props) {
	const { setPost, setUserPost, user, setUser, feed } = useContext(App);
	const instance = axios.create({
		baseURL: "http://localhost:4000",
		withCredentials: true,
	});
	return (
		<div className={`w-full  rounded-lg bg-white pb-5 tablet:phone:rounded-none tablet:phone:px-0 `}>
			<div className="flex items-center justify-between p-3">
				<div className="w-max overflow-visible  hover:cursor-pointer">
					<Link href={`/${props.usernameOrText}`}>
						<User fullname={props.fullname} usernameOrText={props.usernameOrText} avatar={props.avatar} />
					</Link>
				</div>
				<BsThreeDots size={16} className="hover:cursor-pointer" />
			</div>
			<div
				className={`relative  w-full overflow-hidden   hover:cursor-pointer tablet:phone:rounded-none`}
				onClick={() => {
					let post = {
						_id: props.id,
						author: props.author,
						fullname: props.fullname,
						username: props.usernameOrText,
						caption: props.caption,
						imageUrl: props.post,
						avatar: props.avatar,
					};
					setPost(true);
					setUserPost(post);
				}}>
				<Image
					src={props.post}
					alt="post"
					style={{ objectFit: "contain", width: "100%", height: "auto", maxHeight: "640px" }}
					width={1920}
					height={1080}
				/>
			</div>
			<div className="flex items-center justify-between p-3 py-2">
				<div className="flex gap-2">
					{user.feed[props.index].likes.includes(user.user._id) ? (
						<button
							onClick={async () => {
								await instance
									.post(`/main_user/like/${props.id}`, {
										user: user.user?._id,
										author: props.author,
									})
									.then(() => {
										let userFeedsCopy = { ...user };
										const index = userFeedsCopy.feed[props.index].likes.indexOf(user.user?._id);
										let array = [...userFeedsCopy.feed[props.index].likes];
										array.splice(index, 1);
										userFeedsCopy.feed[props.index].likes = array;
										setUser(userFeedsCopy);
									});
							}}>
							<AiFillHeart size={22} color="#7c3aed" />
						</button>
					) : (
						<button
							onClick={async () => {
								await instance
									.post(`/main_user/like/${props.id}`, { user: user.user?._id, author: props.author })
									.then(() => {
										let userFeedsCopy = { ...user };
										userFeedsCopy.feed[props.index].likes.push(user.user?._id);
										setUser(userFeedsCopy);
									});
							}}>
							<AiOutlineHeart size={22} />
						</button>
					)}

					<IoChatbubbleOutline size={20} />
					<RxShare1 size={20} />
				</div>
				<BsBookmark size={16} />
			</div>
			<div className="px-3">
				<span>
					<b>{props.likes.length}</b> Likes
				</span>
			</div>
			<div className="px-3 pt-2">
				<span>
					<b>{props.fullname} </b>
					<span>{props.caption}</span>
				</span>
			</div>
			<button className="px-3 pt-2 text-neutral-500">
				{props.comments.length ? `View all ${props.comments.length} comments` : "No comments"}
			</button>
		</div>
	);
}
