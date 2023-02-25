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
	baseURL: "http://localhost:4000",
	withCredentials: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();
	const ref = useRef<HTMLDivElement>(null);
	const [loading, setLoading] = useState(false);
	const [skip, setSkip] = useState(15);
	const { post, setPost, user, setUser, createPost, userPost, changeProfile, mobileNav } = useContext(App);

	useEffect(() => {
		ref.current?.scrollTo({ top: 0 });
		nprogress.done();
		setSkip(15);
		setPost(false);
		const fetchData = async () => {
			await instance
				.get("/app")
				.then((res) => {
					setUser({ ...user, loading: false, user: res.data.user, feed: res.data.feeds });
					console.log(1);
				})
				.catch(() => {
					console.log(2);
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
				const div = ref.current;
				if (div != undefined) {
					const result: number = div?.scrollHeight - div?.scrollTop;
					console.log(result);
					if (result <= 3029 && !loading) {
						setSkip((current) => {
							return current + 15;
						});
						setLoading(true);
						await instance
							.post("/feeds", { skip })
							.then((res) => {
								console.log(res.data);
								setUser({ ...user, feed: [...user.feed, ...res.data] });
							})
							.finally(() => {
								setLoading(false);
							});
					}
				}
			}}
			className="h-full w-full overflow-y-scroll  phone:h-[calc(100%-50px)] tablet:flex tablet:phone:block">
			{pathname === "/login" || pathname === "/register" ? null : <Nav />}
			{pathname === "/login" || pathname === "/register" ? null : <Sidenav />}
			{createPost && <Create />}
			{changeProfile && <EditAvatar />}
			{mobileNav && <MobileSearch />}
			{post && (
				<Post
					fullname={user.user?.fullname}
					usernameOrText={user.user?.username}
					avatar={user.user?.avatar}
					post={userPost.imageUrl}
					author={userPost.author}
				/>
			)}
			{children}
			{pathname === "/login" || pathname === "/register" ? null : <Bottomnav />}
		</div>
	) : (
		<div className="grid h-full w-full place-items-center text-2xl">{`Loading...`}</div>
	);
}
