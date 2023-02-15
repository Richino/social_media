/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Avatar from "../../../components/common/avatar";
import { TbGridDots } from "react-icons/tb";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineCamera } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { App } from "../../context";
import Image from "next/image";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

export default function Page({ params }: any) {
	const pathname = usePathname();
	const { setPost, setUser, user, userProfile, setUserProfile, setUserPost } = useContext(App);
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
	const instance = axios.create({
		baseURL: "http://localhost:4000",
		withCredentials: true,
	});
	useEffect(() => {
		console.log(pathname);
		const fetchData = async () => {
			await instance
				.post(`/user${pathname}`)
				.then((res) => {
					setUserProfile({ ...user, loading: false, user: res.data.user, post: res.data.post });
				})
				.catch(() => {
					setUserProfile({ ...user, loading: false, user: null });
					//if (pathname !== "/register") return router.push("/login");
				});
		};
		fetchData();
	}, []);
	const [saved, setSaved] = useState(["/assets/user/saved/0.png", "/assets/user/saved/1.png", "/assets/user/saved/2.png", "/assets/user/saved/3.jpg", "/assets/user/saved/4.png"]);
	return (
		<>
			<div className=" flex h-max w-full flex-col items-center gap-5  text-sm tablet:phone:block ">
				<div className="item flex p-5 pt-0 pb-0 tablet:phone:w-full">
					<div className="p-5 px-0">
						<div className="h-[100px] w-[100px]">
							<Avatar story={false} height={100} width={100} image={userProfile.user?.avatar} />
						</div>
					</div>
					<div className="flex w-[400px]  flex-col gap-3 pl-5 pt-5">
						<div className="flex items-center justify-between gap-4 tablet:phone:block tablet:phone:space-y-4 ">
							<span className="text-base">
								<b>{userProfile.user?.fullname}</b>
							</span>
							<div className="flex items-center gap-2">
								<button className="rounded bg-violet-500 p-1 px-5 text-white tablet:phone:w-full">Edit profile</button>
							</div>
						</div>
						<div className="flex justify-between tablet:phone:hidden">
							<span>
								<b>{userProfile.user?.post ? userProfile.user?.post.length : 0}</b> post
							</span>
							<span>
								<b>{userProfile.user?.followers.length}</b> followers
							</span>
							<span>
								<b>{userProfile.user?.following.length}</b> following
							</span>
						</div>
						<span className="tablet:phone:hidden">{userProfile.user?.username}</span>
						<span className="tablet:phone:hidden">{userProfile.user?.bio}</span>
					</div>
				</div>
				<div className="hidden px-5 pb-5 phone:block">
					<span className="text-base ">
						<b>{params.user}</b>
					</span>
					<span className="hidden tablet:phone:block">{userProfile.user?.bio}</span>
				</div>
				<div className="hidden justify-between border-t border-slate-200 px-10 tablet:phone:flex">
					<span className="flex flex-col items-center py-5">
						<b>{userProfile.user?.post ? userProfile.user?.post.length : 0}</b>
						<span> post</span>
					</span>
					<span className="flex flex-col items-center py-5">
						<b>147</b> <span>followers</span>
					</span>
					<span className="flex flex-col items-center py-5">
						<b>628</b> <span>following</span>
					</span>
				</div>
				<div className="flex w-full max-w-[800px] justify-center  space-x-[60px] border-t border-neutral-200 px-5 pb-0 phone:p-0">
					<button className={`item-center flex justify-center gap-2 border-t-2 py-5 ${index === 1 ? " border-violet-500" : "border-transparent"}`} onClick={() => setIndex(1)}>
						<TbGridDots size={16} />
						<span>
							<b>POST</b>
						</span>
					</button>
					<button className={`item-center flex justify-center gap-2 border-t-2 py-5 ${index === 2 ? " border-violet-500" : "border-transparent"}`} onClick={() => setIndex(2)}>
						<BsBookmark size={16} />
						<span>
							<b>SAVED</b>
						</span>
					</button>
				</div>

				<div className={` ${index === 1 ? "block" : "hidden"}  h-full w-full max-w-[800px]`}>
					{userProfile.post?.length && !userProfile.loading ? (
						<div className="grid h-full w-[800px] grid-cols-3 gap-2  pb-5 phone:h-auto phone:gap-[2px]">
							{userProfile.post?.map((key: any, index: number) => {
								return (
									<div
										key={index}
										className=" relative aspect-square  h-full overflow-hidden hover:cursor-pointer"
										onClick={() => {
											console.log(key);
											setUserPost(key);
											setPost(true);
										}}>
										<Image id="post-image" src={key.imageUrl} alt="post" style={{ objectFit: "cover" }} fill sizes="(max-width: 262px) 100vw" priority={true} />
									</div>
								);
							})}
						</div>
					) : userProfile.post?.length === 0 && userProfile.loading === true ? (
						<div className="flex h-full max-w-[800px]  items-center justify-center gap-2  pb-5 phone:h-auto phone:gap-[2px]">Loading</div>
					) : (
						<div className="flex h-full max-w-[800px]  items-center justify-center gap-2  pb-5 phone:h-auto phone:gap-[2px] ">
							<div className="mt-24 flex flex-col items-center justify-center">
								<AiOutlineCamera size={84} />
								<span className="text-2xl">No post yet</span>
							</div>
						</div>
					)}
				</div>
				<div className={` h-full w-full max-w-[800px] grid-cols-3 gap-2  pb-5 phone:h-auto phone:gap-[2px] ${index === 2 ? "grid" : "hidden"}`}>
					{saved.map((key, index) => {
						return (
							<div key={index} className="relative aspect-square  w-full overflow-hidden hover:cursor-pointer" onClick={() => setPost(true)}>
								<Image id="post-image" src={key} alt="post" className={`h-full w-full object-cover`} fill sizes="(max-width: 261.34px) 100vw, 261.34px" priority={true} />
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
