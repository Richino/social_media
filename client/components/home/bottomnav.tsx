import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import {
	AiFillHome,
	AiOutlineHome,
	AiFillMessage,
	AiOutlineMessage,
} from "react-icons/ai";
import { MdExplore, MdOutlineExplore } from "react-icons/md";
import { VscDiffAdded } from "react-icons/vsc";
import { App } from "../../app/context";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

import Avatar from "../common/avatar";

export default function Bottomnav() {
	const pathname = usePathname();
	nprogress.configure({ showSpinner: false });
	return (
		<div className="fixed bottom-0 left-0 hidden w-full items-center justify-center gap-12 border border-slate-200 bg-white p-2 tablet:phone:flex">
			<div className="flex  items-center  gap-12">
				{pathname === "/" ? (
					<Link href={"/"}>
						<AiFillHome
							className="hover:cursor-pointer"
							size={24}
						/>
					</Link>
				) : (
					<Link href={"/"}>
						<AiOutlineHome
							className="hover:cursor-pointer"
							size={24}
							onClick={() => nprogress.start()}
						/>
					</Link>
				)}
				{pathname === "/explore" ? (
					<Link href={"/explore"}>
						<MdExplore className="hover:cursor-pointer" size={24} />
					</Link>
				) : (
					<Link href={"/explore"}>
						<MdOutlineExplore
							className="hover:cursor-pointer"
							size={24}
							onClick={() => nprogress.start()}
						/>
					</Link>
				)}
				{pathname === "/messages" ? (
					<Link href={"/messages"}>
						<AiFillMessage
							className="hover:cursor-pointer"
							size={24}
						/>
					</Link>
				) : (
					<Link href={"/messages"}>
						<AiOutlineMessage
							className="hover:cursor-pointer"
							size={24}
							onClick={() => nprogress.start()}
						/>
					</Link>
				)}
				<VscDiffAdded className="hover:cursor-pointer" size={24} />
				{pathname === "/stacy123" ? (
					<Link href={"/stacy123"}>
						<div className="h-[32px] w-[32px]">
							<Avatar
								story={false}
								height={32}
								width={32}
								image="/assets/user/profile.jpg"
							/>
						</div>
					</Link>
				) : (
					<Link href={"/stacy123"}>
						<div
							className="h-[32px] w-[32px]"
							onClick={() => nprogress.start()}>
							<Avatar
								story={false}
								height={32}
								width={32}
								image="/assets/user/profile.jpg"
							/>
						</div>
					</Link>
				)}
			</div>
		</div>
	);
}
