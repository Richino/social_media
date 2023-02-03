"use client";
import Avatar from "../../../components/common/avatar";
import { TbGridDots } from "react-icons/tb";
import { BsBookmark } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../context";
import Image from "next/image";

export default function Page({ params }: any) {
	const { setPost } = useContext(PostContext);
	const [index, setIndex] = useState(1);
	const [images, setImages] = useState([
		"/assets/user/images/0.png",
		"/assets/user/images/1.png",
		"/assets/user/images/2.png",
		"/assets/user/images/3.jpg",
		"/assets/user/images/4.png",
		"/assets/user/images/5.png",
		"/assets/user/images/6.png",
		"/assets/user/images/7.png",
		"/assets/user/images/8.jpeg",
	]);
	const [saved, setSaved] = useState(["/assets/user/saved/0.png", "/assets/user/saved/1.png", "/assets/user/saved/2.png", "/assets/user/saved/3.jpg", "/assets/user/saved/4.png"]);
	return (
		<>
			<div className=" flex flex-col items-center text-sm tablet:phone:block w-full  gap-5 h-max ">
				<div className="flex    item tablet:phone:w-full p-5 pt-0 pb-0">
					<div className="p-5 px-0">
						<div className="h-[100px] w-[100px]">
							<Avatar story={false} height={100} width={100} image="/assets/user/profile.jpg" />
						</div>
					</div>
					<div className="pl-5 w-[400px]  flex flex-col gap-3 pt-5">
						<div className="flex gap-4 items-center justify-between tablet:phone:block tablet:phone:space-y-4 ">
							<span className="text-base">
								<b>Stacy Ray</b>
							</span>
							<div className="flex gap-2 items-center">
								<button className="p-1 px-5 bg-violet-500 rounded text-white tablet:phone:w-full">Edit profile</button>
							</div>
						</div>
						<div className="flex justify-between tablet:phone:hidden">
							<span>
								<b>2</b> post
							</span>
							<span>
								<b>147</b> followers
							</span>
							<span>
								<b>628</b> following
							</span>
						</div>
						<span className="tablet:phone:hidden">stacy123</span>
						<span className="tablet:phone:hidden">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</span>
					</div>
				</div>
				<div className="px-5 pb-5 hidden phone:block">
					<span className="text-base ">
						<b>{params.user}</b>
					</span>
					<span className="tablet:phone:block hidden">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</span>
				</div>
				<div className="justify-between tablet:phone:flex hidden px-10 border-t border-slate-200">
					<span className="py-5 flex flex-col items-center">
						<b>2</b>
						<span> post</span>
					</span>
					<span className="py-5 flex flex-col items-center">
						<b>147</b> <span>followers</span>
					</span>
					<span className="py-5 flex flex-col items-center">
						<b>628</b> <span>following</span>
					</span>
				</div>
				<div className="max-w-[800px] w-full flex justify-center  space-x-[60px] border-t border-neutral-200 px-5 phone:p-0 pb-0">
					<button className={`flex gap-2 item-center justify-center py-5 border-t-2 ${index === 1 ? " border-violet-500" : "border-transparent"}`} onClick={() => setIndex(1)}>
						<TbGridDots size={16} />
						<span>
							<b>POST</b>
						</span>
					</button>
					<button className={`flex gap-2 item-center justify-center py-5 border-t-2 ${index === 2 ? " border-violet-500" : "border-transparent"}`} onClick={() => setIndex(2)}>
						<BsBookmark size={16} />
						<span>
							<b>SAVED</b>
						</span>
					</button>
				</div>

				<div className={` grid-cols-3 w-full max-w-[800px] h-full gap-2  phone:h-auto phone:gap-[2px] pb-5 ${index === 1 ? "grid" : "hidden"}`}>
					{images.map((key, index) => {
						return (
							<div key={index} className=" h-full aspect-square  overflow-hidden hover:cursor-pointer relative" onClick={() => setPost(true)}>
								<Image id="post-image" src={key} alt="post" className={`object-cover h-full w-full`} fill />
							</div>
						);
					})}
				</div>
				<div className={` grid-cols-3 w-full max-w-[800px] h-full gap-2  phone:h-auto phone:gap-[2px] pb-5 ${index === 2 ? "grid" : "hidden"}`}>
					{saved.map((key, index) => {
						return (
							<div key={index} className="aspect-square w-full  overflow-hidden hover:cursor-pointer relative" onClick={() => setPost(true)}>
								<Image id="post-image" src={key} alt="post" className={`object-cover h-full w-full`} fill />
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
