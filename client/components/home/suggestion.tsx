"use client";
import { useState } from "react";
import Header from "./header";
import suggested from "../../suggested";
import User from "./user";

export default function Suggestion() {
	const [data, setData] = useState(suggested);
	return (
		<div className="w-full bg-white  rounded-lg  pb-2">
			<Header title="Suggested For You" url="suggestions" />
			{data.map((key, index) => {
				return (
					<div key={index} className="flex gap-2 hover:cursor-pointer hover:bg-slate-100 p-2 px-5 transition-colors items-center">
						<User fullname={key.fullname} avatar={key.avatar} usernameOrText={key.text} />
					</div>
				);
			})}
		</div>
	);
}
