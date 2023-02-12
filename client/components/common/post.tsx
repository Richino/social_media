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
import { IoChatbubbleOutline, IoPaperPlaneOutline } from "react-icons/io5";

interface Props {
	fullname: string;
	usernameOrText: string;
	avatar: string;
	post: string;
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

	const { setPost } = useContext(App);
	useEffect(() => {
		setData(post);
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const input = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);
	const hidePost = (e: React.MouseEvent<HTMLDivElement>) => (e.target as HTMLDivElement).id === "post-image-container" && setPost(false);
	const hidePopup = (e: React.MouseEvent<HTMLDivElement>) => (e.target as HTMLDivElement).id === "popup" && setPopup(false);

	return (
		<div id="post-modal" className="h-full w-full fixed top-0 left-0 bg-black/80 z-50 flex phone:flex-col phone:bg-neutral-100 phone:overflow-y-auto" onClick={hidePost}>
			<AiOutlineClose color="white" size={40} className="hover:cursor-pointer ml-[20px] close" onClick={() => setPost(false)} />
			{popup && (
				<div id="popup" className="fixed h-full w-full bg-black/80 z-50 flex items-center justify-center p-5" onClick={hidePopup}>
					<div className="bg-white flex flex-col  rounded-md font-bold max-w-[300px] w-full ">
						<button className="py-4 border-b border-neutral-200 text-red-600">Report</button>
						<button className="py-4 border-b border-neutral-200 text-red-600">Unfollow</button>
						<button className="py-4 border-b border-neutral-200">Share</button>
						<button className="py-4 border-b border-neutral-200">Go to post</button>
						<button className="py-4 border-b border-neutral-200">Copy link</button>
						<button className="py-4" onClick={() => setPopup(false)}>
							Cancel
						</button>
					</div>
				</div>
			)}
			<div className="fixed top-0 z-40 w-full">
				<div className="bg-white p-5  place-items-center relative hidden phone:flex justify-between min-h-[83px]">
					<BsChevronLeft size={24} className=" hover:cursor-pointer" onClick={() => setPost(false)} />
					<span className="text-base">
						<b>post</b>
					</span>
					<BsThreeDots size={16} className="hover:cursor-pointer" onClick={() => setPopup(true)} />
				</div>
			</div>

			<div id="post-image-container" className={` w-full  h-full p-10 phone:p-0 phone:mt-[56px] relative flex items-center justify-center `} onClick={hidePost}>
				<div className="bg-white p-5  place-items-center relative hidden  justify-between post-title">
					<BsChevronLeft size={24} className=" hover:cursor-pointer" onClick={() => setPost(false)} />
					<span className="text-base">
						<b>post</b>
					</span>
					<BsThreeDots size={16} className="hover:cursor-pointer" onClick={() => setPopup(true)} />
				</div>
				<div className=" flex items-center justify-center post-image-container h-full bg-gray-700">
					<img id="post-image" src={props.post} alt="post" className="h-full  object-contain" />
				</div>
			</div>
			<div className="hidden justify-between border-b p-5 border-neutral-200 gap-4  bg-white phone:flex sticky top-[83px] flex-col">
				<div className="flex justify-between">
					<User fullname={props.fullname} avatar={props.avatar} usernameOrText={props.usernameOrText} />
					<div className="flex gap-2 items-center">
						<button className="text-violet-500 border-violet-500 border p-2  px-4 rounded-md hover:text-white hover:bg-violet-500 transition-colors">
							<b>Follow</b>
						</button>
						<BsThreeDots size={16} className="hover:cursor-pointer phone:hidden" onClick={() => setPopup(true)} />
					</div>
				</div>
			</div>
			<div className={`w-[500px]  h-full bg-white phone:min-w-0  phone:w-full comments-box`}>
				<div className="border-b p-5 border-neutral-200 phone:hidden bg-white gap-4 flex flex-col">
					<div className="flex justify-between">
						<User fullname={props.fullname} avatar={props.avatar} usernameOrText={props.usernameOrText} />
						<div className="flex gap-2 items-center">
							<button className="text-violet-500 border-violet-500 border p-2  px-4 rounded-md hover:text-white hover:bg-violet-500 transition-colors">
								<b>Follow</b>
							</button>
							<BsThreeDots size={16} className="hover:cursor-pointer threedots" onClick={() => setPopup(true)} />
						</div>
					</div>
				</div>
				<div className={`bg-neutral-100  p-5 space-y-5   overflow-y-auto ${width > 600 && "h-[calc(100%-(83px+65px))]"} phone:pb-[85px]`}>
					{data?.map((key: any, postIndex: number) => {
						return (
							<div key={postIndex} className="flex gap-2  ">
								<div className="flex flex-col items-center gap-2  pb-2  max-w-[32px]">
									<div className="h-[32px] w-[32px]">
										<Avatar height={32} width={32} image={key?.avatar} story={false} />
									</div>
									<div className={`border-l border-b h-full   border-neutral-300 rounded-bl-lg  ${show === postIndex ? "ml-14 w-14" : "ml-4 w-4"}`}></div>
								</div>
								<div className="flex flex-col gap-2 w-full">
									<div className="bg-white w-full rounded-lg flex flex-col p-5 gap-2 ">
										<div className="flex justify-between">
											<span>{key?.fullname}</span>
											<BsThreeDots size={16} className="hover:cursor-pointer" />
										</div>
										<span className="leading-5 text-neutral-600">{key?.comment}</span>
										<div className="flex justify-between items-center text-neutral-500">
											<div className="flex gap-2 items-center ">
												<button>Like</button>
												<span>{key?.timestamp}</span>
											</div>
											<div className="flex gap-2 items-center">
												<AiOutlineHeart size={12} />
												<span>{key?.likes}</span>
											</div>
										</div>
									</div>
									<button
										className={` items-center gap-2 text-neutral-500 ${key?.replies.length ? "flex" : "hidden"}`}
										onClick={() => {
											if (Number.isFinite(show) && show === postIndex) {
												setShow(null);
												return;
											}
											setShow(postIndex);
										}}>
										<span>
											{show === postIndex ? "Hide replies" : "View replies"}({key?.replies.length})
										</span>
									</button>
									{key.replies
										? key.replies.map((key: any, repliesIndex: number) => {
												return (
													<div key={repliesIndex} className={`gap-2 ${show === postIndex ? "flex" : "hidden"}`}>
														<div className="h-[32px] w-[32px] ">
															<Avatar height={32} width={32} image={key?.avatar} story={false} />
														</div>
														<div className="bg-white w-full rounded-lg flex flex-col p-5 gap-2 ">
															<span>{key?.fullname}</span>
															<span className="leading-5 text-neutral-500">{key?.comment}</span>
															<div className="flex justify-between items-center text-neutral-400">
																<div className="flex gap-2 items-center ">
																	<button>Like</button>
																	<span>{key?.timestamp}</span>
																</div>
																<div className="flex gap-2 items-center">
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

				<div className="border-t border-neutral-200  w-full  flex flex-col  gap-2 items-center phone:hidden">
					<div className="border-t border-neutral-200  w-full  flex justify-between p-5 gap-2 items-center">
						<AiOutlineHeart size={24} className="text-neutral-400" />
						<input type="text" placeholder="Add a comment..." className="w-full h-full text-sm placeholder:text-neutral-400" value={text} onChange={input} />
						<button className="text-violet-500">
							<IoPaperPlaneOutline size={24} />
						</button>
					</div>
				</div>
			</div>

			<div className="border-t border-neutral-200  w-full phone:flex  justify-between p-5 gap-2 items-center hidden bg-white fixed bottom-0">
				<AiOutlineHeart size={24} className="text-neutral-400" />
				<input type="text" placeholder="Add a comment..." className="w-full h-full text-sm placeholder:text-neutral-400" value={text} onChange={input} />
				<button className="text-violet-500">
					<IoPaperPlaneOutline size={24} />
				</button>
			</div>
		</div>
	);
}
