import Image from "next/image";
import { useState, useEffect } from "react";

export default function Gallery() {
	const [image, setImage] = useState(`/assets/black.jpg`);
	useEffect(() => {
		setImage(`/assets/${Math.floor(Math.random() * 6) + 1}.jpg`);
	}, []);

	return (
		<div className=" h-full w-full grid place-items-center phone:hidden">
			<div className="h-full w-full relative ">
				<div className="h-full w-full bg-black/30 absolute top-0 left-0 z-50 grid place-items-center p-5">
					<div className="grid place-items-center">
						<h1 className="title text-white text-7xl">Moments</h1>
						<span className="title text-white text-3xl">Share your journeys here</span>
					</div>
				</div>

				<Image src={image} alt="slide image" fill style={{ objectFit: "cover" }} priority />
			</div>
		</div>
	);
}
