"use client";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useContext } from "react";
import Bottomnav from "../../components/home/bottomnav";
import Nav from "../../components/home/nav";
import Sidenav from "../../components/home/sidenav";
import { PostContext } from "../context";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import Post from "../../components/common/post";

export default function Layout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const ref = useRef<HTMLDivElement>(null);
	const { post,setPost } = useContext(PostContext);

	useEffect(() => {
		ref.current?.scrollTo({ top: 0 });
		nprogress.done();
		setPost(false)
	}, [pathname]);

	return (
		<div ref={ref} className="h-full w-full overflow-y-auto tablet:flex tablet:phone:block phone:h-[calc(100%-50px)]">
			{pathname === "/login" || pathname === "/register" ? null : <Nav />}
			{pathname === "/login" || pathname === "/register" ? null : <Sidenav />}
			{post && <Post fullname="Joseph Rogan" usernameOrText="@jrkrogan258" avatar="/assets/users/1.jpg" post="/assets/feeds/joseph/3.png" />}
			{children}
			{pathname === "/login" || pathname === "/register" ? null : <Bottomnav />}
		</div>
	);
}
