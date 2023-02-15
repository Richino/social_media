"use client";
import Avatar from "../common/avatar";
import stories from "../../stories";
import { useState } from "react";

export default function Stories() {
	const [data, setData] = useState(stories);

	return (
		<div className="relative  h-max  w-full  rounded-lg  bg-white tablet:phone:rounded-none">
			<div className="stories flex gap-4 overflow-y-auto p-5 pb-2">
				{data.map((key, index) => {
					return (
						<div key={index} className="flex flex-col items-center gap-1">
							<div className="relative h-[65px] w-[65px]">
								<Avatar height={65} width={65} story={true} image={key.avatar} />
							</div>
							<span className="w-[60px] truncate">{key.fullname}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
