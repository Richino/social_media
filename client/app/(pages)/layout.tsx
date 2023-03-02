/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useEffect, useContext, useState } from "react";
import Bottomnav from "../../components/home/bottomnav";
import Nav from "../../components/home/nav";
import Sidenav from "../../components/home/sidenav";
import { App } from "../context";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import Post from "../../components/common/post";
import axios from "axios";
import Create from "../../components/common/createPost";
import EditAvatar from "../../components/common/editAvatar";
import MobileSearch from "../../components/common/mobileSearch";

const instance = axios.create({
	baseURL: process.env.url,
	withCredentials: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();
	const ref = useRef<HTMLDivElement>(null);
	const [loading, setLoading] = useState(false);
	const [skip, setSkip] = useState(15);
	const {
		post,
		setPost,
		user,
		setUser,
		createPost,
		userPost,
		changeProfile,
		mobileNav,
		setNotifications,
		notifications,
	} = useContext(App);

	useEffect(() => {
		ref.current?.scrollTo({ top: 0 });
		nprogress.done();
		setSkip(15);
		setPost(false);
		const fetchData = async () => {
			await instance
				.get("/app")
				.then((res) => {
					console.log(res);
					setNotifications({ ...notifications, loading: false, data: res.data.notifications });
					setUser({ ...user, loading: false, user: res.data.user, feed: res.data.feeds });
				})
				.catch(() => {
					setUser({ ...user, loading: false, user: null });
					if (pathname !== "/register") return router.push("/login");
				});
		};
		fetchData();
	}, [pathname]);

	return (!user?.loading && user.user) || pathname === "/login" || pathname === "/register" ? (
		<div
			ref={ref}
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
			}}
			className="main h-screen w-full  overflow-hidden tablet:flex tablet:phone:block">
			{pathname === "/login" || pathname === "/register" ? null : <Nav />}
			{pathname === "/login" || pathname === "/register" ? null : <Sidenav />}
			{createPost && <Create />}
			{changeProfile && <EditAvatar />}
			{mobileNav && <MobileSearch />}
			{post && (
				<Post
					fullname={userPost.fullname}
					usernameOrText={userPost.username}
					avatar={userPost.avatar}
					post={userPost.imageUrl}
					author={userPost.author}
					id={userPost._id}
				/>
			)}
			{children}
			{pathname === "/login" || pathname === "/register" ? null : <Bottomnav />}
		</div>
	) : (
		<div className="grid h-full w-full place-items-center text-2xl">{`Loading...`}</div>
	);
}
