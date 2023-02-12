import Avatar from "../common/avatar";
import { VscDiffAdded } from "react-icons/vsc";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import Search from "./search";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { App } from "../../app/context";
import { useContext } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function Nav() {
	const pathname = usePathname();
	const { user, openCreatePost } = useContext(App);
	console.log();
	nprogress.configure({ showSpinner: false });
	return (
		<>
			<div className="flex justify-center py-2 bg-white gap-4  sticky top-0 z-40 tablet:hidden">
				<div className="flex items-center justify-center gap-5">
					<div className="w-[250px] nestHub:grid nestHub:place-items-center">
						{pathname === "/" ? (
							<button className="title text-2xl font-bold">Moments</button>
						) : (
							<Link href={"/"} onClick={() => nprogress.start()}>
								<button className="title text-2xl font-bold">Moments</button>
							</Link>
						)}
					</div>
					<div className="w-[500px] nestHub:w-[400px]">
						<Search placeholder="Search here..." type="nav" />
					</div>
					<div className="shrink-0 flex gap-4 w-[250px] justify-end items-center  nestHub:justify-center">
						<div className="bg-neutral-100 p-2 rounded-full hover:cursor-pointer shrink-0 h-[42px] w-[42px] grid place-items-center"  onClick={() => openCreatePost(true)}>
							<IoIosAddCircleOutline size={22} />
						</div>
						{pathname === "/messages" ? (
							<div className="bg-neutral-100 p-2 rounded-full hover:cursor-pointer shrink-0 h-[42px] w-[42px] grid place-items-center">
								<IoChatbubbleEllipsesOutline size={20} />
							</div>
						) : (
							<Link href={"/messages"} onClick={() => nprogress.start()}>
								<div className="bg-neutral-100 p-2 rounded-full hover:cursor-pointer shrink-0 h-[42px] w-[42px] grid place-items-center">
									<IoChatbubbleEllipsesOutline size={20} />
								</div>
							</Link>
						)}
						{pathname === "/" + user.user?.username ? (
							<Avatar story={false} height={42} width={42} image={user.user?.avatar} />
						) : (
							<Link href={"/" + user.user?.username} onClick={() => nprogress.start()}>
								<Avatar story={false} height={42} width={42} image={user.user?.avatar} />
							</Link>
						)}
					</div>
				</div>
			</div>
			<div className="w-full bg-white  border border-slate-200  phone:flex hidden    sticky top-0    items-center p-2 justify-between px-5 z-40">
				<span className="title text-2xl font-bold ">M</span>
				<Search type="nav" placeholder="Search here..." />
				<div className="flex gap-5">
					{pathname === "/activities" ? (
						<Link href={"/activities"}>
							<AiFillHeart className="hover:cursor-pointer" size={24} />
						</Link>
					) : (
						<Link href={"/activities"}>
							<AiOutlineHeart className="hover:cursor-pointer" size={24} />
						</Link>
					)}
					<RxHamburgerMenu className="hover:cursor-pointer" size={24} />
				</div>
			</div>
		</>
	);
}
