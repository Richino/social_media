"use client";
import { useState } from "react";
import { RiUserFollowLine } from "react-icons/ri";
import data from "../../activities";
import Avatar from "../common/avatar";
import Header from "./header";

export default function Activity() {
	const [users, setUsers] = useState(data);
	return (
		<div className="w-full bg-white  rounded-lg">
			<Header title="Activity" url="activities" />
			<div className="pb-2">
				{users.map((key, index) => {
					return (
						<div key={index} className="flex gap-2 hover:cursor-pointer hover:bg-neutral-100 p-2 px-5 transition-colors items-center">
							<Avatar story={false} height={42} width={42} image={key.image} />
							<span>
								<b>{key.name}</b> {key.type === "post" ? "likes your post." : "started following you."} <span className="text-neutral-500">{key.posted}</span>
							</span>
							{key.type === "post" ? (
								<div className=" hover:cursor-pointer shrink-0 bg-neutral-200 grid place-items-center  relative rounded overflow-hidden">
									<img src={key.likedImage} alt="search icon" style={{ objectFit: "cover" }} className="h-[32px] w-[32px] " />
								</div>
							) : (
								<div className=" hover:cursor-pointer shrink-0 bg-violet-200 rounded-full  h-[32px] w-[32px]   grid place-items-center">
									<RiUserFollowLine size={17} color="#7c3aed" />
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
