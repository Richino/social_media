"use client";
import { useContext, useState } from "react";
import { RiUserFollowLine } from "react-icons/ri";
import data from "../../activities";
import Avatar from "../common/avatar";
import Header from "./header";
import Image from "next/image";
import { App } from "../../app/context";

export default function Activity() {
	const [users, setUsers] = useState(data);
	const { notifications } = useContext(App);
	return (
		<div className="w-full rounded-lg  bg-white">
			<Header title="Activity" url="activities" />
			<div className="pb-2">
				{notifications.data.map((key: any, index: number) => {
					return (
						<div
							key={index}
							className="flex items-center gap-2 p-2 px-5 transition-colors hover:cursor-pointer hover:bg-neutral-100">
							<Avatar story={false} height={42} width={42} image={key.avatar[0]} />
							<span className="w-full">
								<b>{key.author_fullname}</b>{" "}
								{key.action === "like" ? "likes your post." : "started following you."}{" "}
								<span className="text-neutral-500">{/*key.posted*/}</span>
							</span>
							{key.action === "like" ? (
								<div className=" relative grid h-[32px] w-[32px] shrink-0  place-items-center overflow-hidden rounded bg-neutral-200 hover:cursor-pointer">
									<Image
										src={key.image[0]}
										alt="search icon"
										style={{ objectFit: "cover" }}
										fill
										sizes="100px"
									/>
								</div>
							) : (
								<div className=" grid h-[32px] w-[32px] shrink-0   place-items-center rounded-full  bg-violet-200 hover:cursor-pointer">
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
