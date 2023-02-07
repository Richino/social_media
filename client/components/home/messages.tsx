"use client";
import Header from "./header";
import Search from "./search";
import message from "../../message";
import { useState } from "react";
import User from "./user";

export default function Messages() {
	const [data, setData] = useState(message);
	return (
		<div className="w-full bg-white  rounded-lg  pb-2">
			<Header title="Messages" url="messages" />
			<div className="px-5 pb-5">
				<Search placeholder="Search messages" type="messages" />
			</div>
			<div className="mx-5 flex justify-between border-b border-neutral-200">
				<div className="space-x-5">
					<button className="border-b-4 pb-2 border-neutral-900">
						<b>Friends</b>
					</button>
					<button className="pb-2 text-neutral-500">General</button>
				</div>
				<button className="pb-2 text-violet-600">
					<b>Request(2)</b>
				</button>
			</div>
			{data.map((key, index) => {
				return (
					<div key={index} className="flex gap-2 hover:cursor-pointer hover:bg-neutral-100 p-2 px-5 transition-colors items-center">
						<User fullname={key.fullname} avatar={key.avatar} usernameOrText={key.active} />
					</div>
				);
			})}
		</div>
	);
}