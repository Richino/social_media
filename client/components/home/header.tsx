"use client";
import { useRouter } from "next/navigation";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

interface Props {
	title: string;
	url: string;
}

export default function Header(props: Props) {
	const router = useRouter();
	nprogress.configure({ showSpinner: false });
	function showAll(type: string) {
		nprogress.start();
		router.push(type);
	}

	return (
		<div className="flex justify-between items-center p-5">
			<span className="text-sm ">
				<b>{props.title}</b>
			</span>
			<button className="text-neutral-500" onClick={() => showAll(props.url)}>
				Show all
			</button>
		</div>
	);
}
