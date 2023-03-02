"use client";
import axios from "axios";
import { App } from "../../app/context";
import { useContext } from "react";

interface Props {
	placeholder: string;
	type: string;
	mobile: boolean;
}
export default function Search(props: Props) {
	const instance = axios.create({
		baseURL: process.env.url,
		withCredentials: true,
	});
	const { setUsers, setIsOpen, setMobileNav } = useContext(App);
	return (
		<div className="flex  items-center justify-center overflow-hidden rounded-full bg-neutral-100">
			<div className="shrink-0 px-3 hover:cursor-pointer">
				<img src={"/assets/icons/search.svg"} alt="search icon" className="h-4" />
			</div>
			<input
				className="w-full bg-neutral-100 p-2 placeholder:text-neutral-400"
				placeholder={props.placeholder}
				onChange={async (e: any) => {
					if (props.mobile) setMobileNav(true);
					if (e.target.value.length === 0) {
						setIsOpen(false);
						setMobileNav(false);
						setUsers([]);
					} else {
						await instance
							.post("/search/user", { username: e.target.value })
							.then((res) => {
								setIsOpen(true);
								setUsers(res.data);
							})
							.catch((err) => console.log(err.message));
					}
				}}
				onFocus={() => {
					console.log("3333");
				}}
			/>
		</div>
	);
}
