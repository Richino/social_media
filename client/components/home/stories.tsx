"use client";
import Avatar from "../common/avatar";
import stories from "../../stories";
import { useState } from "react";

export default function Stories() {
	const [data, setData] = useState(stories);

	return (
		<div className="bg-white  rounded-lg  w-full  h-max  relative tablet:phone:rounded-none">
			<div className="flex gap-4 overflow-y-auto p-5 pb-2 stories">
				{data.map((key, index) => {
					return (
						<div key={index} className="flex flex-col items-center gap-1">
							<div className="relative w-[65px] h-[65px]">
								<Avatar height={65} width={65} story={true} image={key.avatar} />
							</div>
							<span className="truncate w-[60px]">{key.fullname}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
