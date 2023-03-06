"use client";
import Activity from "../../components/home/activity";
import Explore from "../../components/home/explore";
import Messages from "../../components/home/messages";
import PostFeed from "../../components/home/postFeed";
import Suggestion from "../../components/home/suggestion";
import Stories from "../../components/home/stories";
import { App } from "../context";
import { useContext, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
const instance = axios.create({
	baseURL: process.env.url,
	withCredentials: true,
});

export default function Home() {
	const { user, setUser } = useContext(App);
	const pathname = usePathname();
	const [loading, setLoading] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const [skip, setSkip] = useState(15);

	return (
		<div
			ref={ref}
			className="feeds flex h-[calc(100%-58px)] w-full justify-center gap-5  overflow-y-auto bg-neutral-100 phone:h-[calc(100%-112px)]"
			onScroll={async () => {
				if (pathname != "/") return;
				const div = ref.current;
				if (div != undefined) {
					const result: number = div?.scrollHeight - div?.scrollTop;
					if (result <= 3029 && !loading) {
						setSkip((current) => current + 15);
						setLoading(true);
						await instance
							.post("/feeds", { skip })
							.then((res) => {
								console.log(res.data);
								setUser({ ...user, feed: [...user.feed, ...res.data] });
							})
							.finally(() => setLoading(false));
					}
				}
			}}>
			<div className=" cool sticky top-[0px] w-[250px] shrink-0 space-y-5 overflow-y-auto py-5 tablet:hidden">
				<Activity />
			</div>
			<div className="jusify-center flex h-max w-[400px] flex-col items-center gap-5 py-5  tablet:phone:w-full">
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
