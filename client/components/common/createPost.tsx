"use client";
import { App } from "../../app/context";
import Image from "next/image";
import { useContext, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import User from "../home/user";
import axios from "axios";

export default function Create() {
	const [index, setIndex] = useState(1);
	const [url, setUrl] = useState<any>("/assets/black.jpg");
	const [value, setValue] = useState("");
	const [image, setImage] = useState<any>("");
	const { user, openCreatePost } = useContext(App);
	const instance = axios.create({
		baseURL: "http://localhost:4000",
		withCredentials: true,
		headers: { "Content-Type": "multipart/form-data" },
	});
	//	instance.defaults.headers.post["Content-Type"] = "multipart/form-data";
	return (
		<div
			id="create-post"
			className="fixed flex items-center justify-center top-0 left-0 bg-black/75 z-50 h-screen w-full p-10"
			onClick={(e: React.MouseEvent<HTMLDivElement>) => (e.target as HTMLDivElement).id === "create-post" && openCreatePost(false)}>
			<div className=" aspect-square h-full overflow-hidden grid place-items-center">
				<div className="bg-white aspect-square w-full rounded">
					<div className="p-3 border-b border-neutral-200 flex justify-between items-center">
						{index === 1 ? (
							<button className=" text-red-500" onClick={() => openCreatePost(false)}>
								<b>Close</b>
							</button>
						) : (
							<BsChevronLeft size={24} className=" hover:cursor-pointer" onClick={() => setIndex(index - 1)} />
						)}

						<span>
							<b>Create new post</b>
						</span>
						{index === 1 ? (
							<div />
						) : index === 2 ? (
							<button onClick={() => setIndex(3)}>Next</button>
						) : (
							<button
								className="text-violet-500"
								onClick={async (e) => {
									e.preventDefault();
									const formData = new FormData();
									formData.append("image", image);
									formData.append("caption", value);
									await instance
										.post("/post/upload", formData)
										.then((res) => {
											console.log(res.data);
											//openCreatePost(false)
										})
										.catch((err) => console.log(err.message));
								}}>
								<b>Post</b>
							</button>
						)}
					</div>
					<div className={`place-items-center h-full mt-[-33px] ${index == 1 ? "grid" : "hidden"}`}>
						<div className="grid place-items-center gap-5">
							<Image alt="create image" src={"assets/icons/gallery.svg"} height={80} width={80} />
							<button
								className="bg-violet-500 text-white p-5 py-2 rounded-md"
								onClick={() => {
									document.getElementById("file-input")?.click();
								}}>
								Select from computer
							</button>
							<input
								id="file-input"
								type="file"
								name="post"
								accept="image/png, image/jpeg"
								className="hidden"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									if (e.target.files && e.target.files.length > 0) {
										setImage(e.target.files?.[0]);
										setUrl(URL.createObjectURL(e.target.files?.[0]));
									}
									setIndex(2);
								}}
							/>
						</div>
					</div>
					<div className={`place-items-center h-[calc(100%-49px)] w-full ${index >= 2 ? "flex" : "hidden"} relative`}>
						<div className="h-full w-full bg-black relative transition-width duration-500 ease-in-out">
							<Image alt="create image" src={url} fill style={{ objectFit: "contain" }} />
						</div>
						<div className={`h-full ${index == 3 ? "w-full" : "w-0"} transition-width duration-500 ease-in-out  space-y-2`}>
							<div className="p-2">
								<User avatar={user.user?.avatar} fullname={user.user?.fullname} usernameOrText={""} />
							</div>
							<textarea
								placeholder="Write a caption."
								className="w-full p-2 resize-none h-48"
								value={value}
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
								maxLength={2200}
							/>
							<div className="p-2 text-neutral-500">
								<span>{`${value.length}/2200`}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
