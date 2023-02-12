/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useEffect, useContext } from "react";
import Bottomnav from "../../components/home/bottomnav";
import Nav from "../../components/home/nav";
import Sidenav from "../../components/home/sidenav";
import { App } from "../context";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import Post from "../../components/common/post";
import axios from "axios";
import Create from "../../components/common/createPost";
const instance = axios.create({
	baseURL: "http://localhost:4000",
	withCredentials: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();
	const ref = useRef<HTMLDivElement>(null);
	const { post, setPost, user, setUser, createPost } = useContext(App);

	useEffect(() => {
		ref.current?.scrollTo({ top: 0 });
		nprogress.done();
		setPost(false);
		const fetchData = async () => {
			await instance
				.get("/app")
				.then((res) => {
					console.log(1);

					//user not loading
					setUser({ ...user, loading: false, user: res.data });
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
		<div ref={ref} className="h-full w-full overflow-y-scroll tablet:flex tablet:phone:block phone:h-[calc(100%-50px)]">
			{pathname === "/login" || pathname === "/register" ? null : <Nav />}
			{pathname === "/login" || pathname === "/register" ? null : <Sidenav />}
			{createPost && <Create />}
			{post && <Post fullname="Joseph Rogan" usernameOrText="@jrkrogan258" avatar="/assets/users/1.jpg" post="/assets/feeds/joseph/3.png" />}
			{children}
			{pathname === "/login" || pathname === "/register" ? null : <Bottomnav />}
		</div>
	) : (
		<div className="grid place-items-center text-2xl h-full w-full">{`Loading...`}</div>
	);
}
