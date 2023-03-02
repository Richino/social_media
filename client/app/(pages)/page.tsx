"use client";
import Activity from "../../components/home/activity";
import Explore from "../../components/home/explore";
import Messages from "../../components/home/messages";
import PostFeed from "../../components/home/postFeed";
import Suggestion from "../../components/home/suggestion";
import Stories from "../../components/home/stories";
import { App } from "../context";
import { useContext } from "react";

export default function Home() {
	const { user } = useContext(App);
	return (
		<div className="feeds flex h-[calc(100%-58px)] w-full justify-center gap-5  overflow-y-auto bg-neutral-100 phone:h-[calc(100%-112px)]">
			<div className=" cool sticky top-[0px] w-[250px] shrink-0 space-y-5 overflow-y-auto py-5 tablet:hidden">
				<Activity />
			</div>
			<div className="jusify-center flex h-max w-[500px] flex-col items-center gap-5 py-5 nestHub:w-[400px] tablet:phone:w-full">
				<Stories />
				{user.feed?.map((key: any, value: number) => {
					return (
						<PostFeed
							fullname={key.author_fullname}
							usernameOrText={key.author_username}
							avatar={key.avatar[0]}
							post={key.imageUrl}
							caption={key.caption}
							likes={key.likes}
							comments={key.comments}
							id={key._id}
							author={key.author}
							key={value}
							index={value}
						/>
					);
				})}
			</div>
			<div className="cool sticky top-[0px] h-full w-[250px] shrink-0 space-y-5 overflow-y-auto py-5 tablet:hidden">
				<Messages />
			</div>
		</div>
	);
}
