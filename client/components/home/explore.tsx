"use client";
import { useState } from "react";
import Header from "./header";
import Image from "next/image";

export default function Explore() {
	const [images, setImages] = useState(["/assets/explore/1.jpg", "/assets/explore/2.jpg", "/assets/explore/3.jpg", "/assets/explore/4.jpg"]);
	return (
		<div className="w-full bg-white  rounded-lg  pb-1">
			<Header title="Explore" url="explore" />
			<div className="grid grid-cols-3 p-2 gap-1 pt-0">
				{images.map((key, index) => {
					return (
						<div key={index} className="relative aspect-square rounded overflow-hidden hover:cursor-pointer">
							<Image src={key} alt="explore" className={`object-cover h-full w-full`}  fill />
						</div>
					);
				})}
			</div>
		</div>
	);
}
