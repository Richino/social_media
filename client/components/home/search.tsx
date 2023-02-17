"use client";
import axios from "axios";

interface Props {
	placeholder: string;
	type: string;
}
export default function Search(props: Props) {
	const instance = axios.create({
		baseURL: "http://localhost:4000",
		withCredentials: true,
	});
	return (
		<div className="flex  items-center justify-center overflow-hidden rounded-full bg-neutral-100">
			<div className="shrink-0 px-3 hover:cursor-pointer">
				<img
					src={"/assets/icons/search.svg"}
					alt="search icon"
					className="h-4"
				/>
			</div>
			<input
				className="w-full bg-neutral-100 p-2 placeholder:text-neutral-400"
				placeholder={props.placeholder}
				onChange={async (e: any) => {
					console.log(props.type, e.target.value);
					await instance
						.post("/search/user", { username: e.target.value })
						.then((res) => {})
						.catch((err) => console.log(err.message));
				}}
			/>
		</div>
	);
}
