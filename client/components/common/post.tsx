"use client";
import { BsChevronLeft, BsEmojiSmile, BsThreeDots } from "react-icons/bs";
import { AiFillHeart, AiOutlineClose, AiOutlineHeart } from "react-icons/ai";
import User from "../home/user";
import post from "../../post";
import { ChangeEvent, useContext, useEffect, useState, useRef } from "react";
import Avatar from "./avatar";
import x from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { App } from "../../app/context";
import Image from "next/image";
import { IoChatbubbleOutline, IoPaperPlaneOutline } from "react-icons/io5";

interface Props {
	fullname: string;
	usernameOrText: string;
	avatar: string;
	post: string;
	author: string;
}

interface Comments {
	fullname: string;
	avatar: string;
	comment: string;
	timestamp: string;
	likes: number;
	replies: {
		fullname: string;
		avatar: string;
		comment: string;
		timestamp: string;
		likes: number;
	}[];
}

export default function Post(props: Props) {
	const [data, setData] = useState<Comments[]>([]);
	const [show, setShow] = useState<number | null>();
	const [popup, setPopup] = useState(false);
	const [comments, setComments] = useState<number>(0);
	const [showPicker, setShowPicker] = useState(false);
	const [text, setText] = useState("");
	const [width, setWidth] = useState(window.innerWidth);

	const { setPost, user } = useContext(App);
	useEffect(() => {
		setData(post);
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const input = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);
	const hidePost = (e: any) => {
		console.log(e.target.id, 1);
		if ((e.target as HTMLDivElement).id === "post-image-container") setPost(false);
		if ((e.target as HTMLDivElement).id === "post-image-container-2") setPost(false);
	};

	const hidePopup = (e: React.MouseEvent<HTMLDivElement>) =>
		(e.target as HTMLDivElement).id === "popup" && setPopup(false);

	return (
		<div
			id="post-modal"
			className="fixed top-0 left-0 z-50 flex h-full w-full bg-black/80 phone:flex-col phone:overflow-y-auto phone:bg-neutral-100"
			onClick={hidePost}>
			<div className="close fixed top-[20px] left-[20px] z-50 rounded-full bg-white/25  p-2 hover:cursor-pointer">
				<AiOutlineClose color="white" size={20} className="" onClick={() => setPost(false)} />
			</div>
			{popup && (
				<>
					{user.user?._id === props.author ? (
						<div
							id="popup"
							className="fixed z-50 flex h-full w-full items-center justify-center bg-black/80 p-5"
							onClick={hidePopup}>
							<div className="flex w-full max-w-[300px]  flex-col rounded-md bg-white font-bold ">
								<button className="border-b border-neutral-200 py-4 text-violet-500">Edit</button>
								<button className="border-b border-neutral-200 py-4 text-red-500">Delete</button>
								<button className="py-4" onClick={() => setPopup(false)}>
									Cancel
								</button>
							</div>
						</div>
					) : (
						<div
							id="popup"
							className="fixed z-50 flex h-full w-full items-center justify-center bg-black/80 p-5"
							onClick={hidePopup}>
							<div className="flex w-full max-w-[300px]  flex-col rounded-md bg-white font-bold ">
								<button className="border-b border-neutral-200 py-4 text-red-500">Report</button>
								<button className="border-b border-neutral-200 py-4 text-red-500">Unfollow</button>
								<button className="border-b border-neutral-200 py-4">Share</button>
								<button className="border-b border-neutral-200 py-4">Go to post</button>
								<button className="border-b border-neutral-200 py-4">Copy link</button>
								<button className="py-4" onClick={() => setPopup(false)}>
									Cancel
								</button>
							</div>
						</div>
					)}
				</>
			)}
			<div className="fixed top-0 z-40 w-full">
				<div className="relative hidden  min-h-[83px] place-items-center justify-between bg-white p-5 phone:flex">
					<BsChevronLeft size={24} className=" hover:cursor-pointer" onClick={() => setPost(false)} />
					<span className="text-base">
						<b>post</b>
					</span>
					<BsThreeDots size={16} className="hover:cursor-pointer" onClick={() => setPopup(true)} />
				</div>
			</div>

			<div
				id="post-image-container"
				className={` relative  flex h-full w-full items-center justify-center p-10 phone:mt-[83px] phone:p-0`}
				onClick={hidePost}>
				<div className="post-title relative  hidden place-items-center justify-between  bg-white p-5">
					<BsChevronLeft size={24} className=" hover:cursor-pointer" onClick={() => setPost(false)} />
					<span className="text-base">
						<b>post</b>
					</span>
					<BsThreeDots size={16} className="hover:cursor-pointer" onClick={() => setPopup(true)} />
				</div>
				<div
					id="post-image-container-2"
					className="post-image-container relative flex h-full w-max items-center  justify-center bg-white transition-width">
					<Image
						priority
						id="post-image"
						src={props.post}
						height={1080}
						width={1920}
						alt="post"
						style={{ height: "100%", width: "auto", objectFit: "contain" }}
						quality={100}
					/>
				</div>
			</div>
			<div className="sticky top-[83px] hidden flex-col justify-between gap-4  border-b border-neutral-200 bg-white p-5 phone:flex">
				<div className="flex justify-between">
					<User fullname={props.fullname} avatar={props.avatar} usernameOrText={props.usernameOrText} />
					<div className="flex items-center gap-2">
						{user.user?._id !== props.author && (
							<button className="rounded-md border border-violet-500 p-2  px-4 text-violet-500 transition-colors hover:bg-violet-500 hover:text-white">
								<b>Follow</b>
							</button>
						)}
						<BsThreeDots
							size={16}
							className="hover:cursor-pointer phone:hidden"
							onClick={() => setPopup(true)}
						/>
					</div>
				</div>
			</div>
			<div className={`comments-box  h-full w-[500px] bg-white  phone:w-full phone:min-w-0`}>
				<div className="flex flex-col gap-4 border-b border-neutral-200 bg-white p-5 phone:hidden">
					<div className="flex justify-between">
						<User fullname={props.fullname} avatar={props.avatar} usernameOrText={props.usernameOrText} />
						<div className="flex items-center gap-2">
							{user.user?._id !== props.author && (
								<button className="rounded-md border border-violet-500 p-2  px-4 text-violet-500 transition-colors hover:bg-violet-500 hover:text-white">
									<b>Follow</b>
								</button>
							)}
							<BsThreeDots
								size={16}
								className="threedots hover:cursor-pointer"
								onClick={() => setPopup(true)}
							/>
						</div>
					</div>
				</div>
				<div
					className={`space-y-5  overflow-y-auto bg-neutral-100   p-5 ${
						width > 600 && "h-[calc(100%-(83px+65px))]"
					} phone:pb-[85px]`}>
					{data?.map((key: any, postIndex: number) => {
						return (
							<div key={postIndex} className="flex gap-2  ">
								<div className="flex max-w-[32px] flex-col items-center  gap-2  pb-2">
									<div className="h-[32px] w-[32px]">
										<Avatar height={32} width={32} image={key?.avatar} story={false} />
									</div>
									<div
										className={`h-full rounded-bl-lg border-l   border-b border-neutral-300  ${
											show === postIndex ? "ml-14 w-14" : "ml-4 w-4"
										}`}></div>
								</div>
								<div className="flex w-full flex-col gap-2">
									<div className="flex w-full flex-col gap-2 rounded-lg bg-white p-5 ">
										<div className="flex justify-between">
											<span>{key?.fullname}</span>
											<BsThreeDots size={16} className="hover:cursor-pointer" />
										</div>
										<span className="leading-5 text-neutral-600">{key?.comment}</span>
										<div className="flex items-center justify-between text-neutral-500">
											<div className="flex items-center gap-2 ">
												<button>Like</button>
												<span>{key?.timestamp}</span>
											</div>
											<div className="flex items-center gap-2">
												<AiOutlineHeart size={12} />
												<span>{key?.likes}</span>
											</div>
										</div>
									</div>
									<button
										className={` items-center gap-2 text-neutral-500 ${
											key?.replies.length ? "flex" : "hidden"
										}`}
										onClick={() => {
											if (Number.isFinite(show) && show === postIndex) {
												setShow(null);
												return;
											}
											setShow(postIndex);
										}}>
										<span>
											{show === postIndex ? "Hide replies" : "View replies"}({key?.replies.length}
											)
										</span>
									</button>
									{key.replies
										? key.replies.map((key: any, repliesIndex: number) => {
												return (
													<div
														key={repliesIndex}
														className={`gap-2 ${show === postIndex ? "flex" : "hidden"}`}>
														<div className="h-[32px] w-[32px] ">
															<Avatar
																height={32}
																width={32}
																image={key?.avatar}
																story={false}
															/>
														</div>
														<div className="flex w-full flex-col gap-2 rounded-lg bg-white p-5 ">
															<span>{key?.fullname}</span>
															<span className="leading-5 text-neutral-500">
																{key?.comment}
															</span>
															<div className="flex items-center justify-between text-neutral-400">
																<div className="flex items-center gap-2 ">
																	<button>Like</button>
																	<span>{key?.timestamp}</span>
																</div>
																<div className="flex items-center gap-2">
																	<AiOutlineHeart size={12} />
																	<span>{key.likes}</span>
																</div>
															</div>
														</div>
													</div>
												);
										  })
										: null}
								</div>
							</div>
						);
					})}
				</div>

				<div className="flex w-full  flex-col  items-center gap-2  border-t border-neutral-200 phone:hidden">
					<div className="flex w-full  items-center  justify-between gap-2 border-t border-neutral-200 p-5">
						<AiOutlineHeart size={24} className="text-neutral-400" />
						<input
							type="text"
							placeholder="Add a comment..."
							className="h-full w-full text-sm placeholder:text-neutral-400"
							value={text}
							onChange={input}
						/>
						<button className="text-violet-500">
							<IoPaperPlaneOutline size={24} />
						</button>
					</div>
				</div>
			</div>

			<div className="fixed bottom-0  hidden w-full  items-center justify-between gap-2 border-t border-neutral-200 bg-white p-5 phone:flex">
				<AiOutlineHeart size={24} className="text-neutral-400" />
				<input
					type="text"
					placeholder="Add a comment..."
					className="h-full w-full text-sm placeholder:text-neutral-400"
					value={text}
					onChange={input}
				/>
				<button className="text-violet-500">
					<IoPaperPlaneOutline size={24} />
				</button>
			</div>
		</div>
	);
}
