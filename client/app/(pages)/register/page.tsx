"use client";
import { ChangeEvent, useState } from "react";
import Gallery from "../../../components/common/gallery";
import Link from "next/link";

export default function Page() {
	const [isChecked, setChecked] = useState(false);
	const [data, setData] = useState({
		username: "",
		fullname: "",
		email: "",
		password: "",
		confirm_password: "",
	});

	function input(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setData((state) => ({
			...state,
			[name]: value,
		}));
	}

	return (
		<div className="h-screen w-screen flex text-xs relative bg-slate-50 overflow-hidden">
			<div className=" w-[38vw] min-w-[500px] p-14 margin-b-24 grid place-items-center phone:w-full phone:min-w-[100%] phone:landscape:block overflow-y-auto phone:landscape:min-w-[400px] phone:landscape:p-10 ">
				<form className="space-y-5 text-zinc-800 w-[80%] flex flex-col phone:w-[100%] phone:landscape:w-[100%]">
					<span className="text-zinc-700 font-bold text-4xl">Register</span>
					<div className="flex flex-col space-y-1">
						<span>Username</span>
						<input className="border p-2 rounded-lg placeholder:text-xs" type="text" placeholder="johnk123" name="username" value={data.username} onChange={input} />
					</div>
					<div className="flex flex-col space-y-1">
						<span>Fullname</span>
						<input className="border p-2 rounded-lg placeholder:text-xs bg-sl" type="text" placeholder="John Kramer" name="fullname" value={data.fullname} onChange={input} />
					</div>
					<div className="flex flex-col space-y-1">
						<span>Email</span>
						<input className="border p-2 rounded-lg placeholder:text-xs" type="email" placeholder="example@mail.com" name="email" value={data.email} onChange={input} />
					</div>
					<div className="flex flex-col space-y-1 ">
						<span>Password</span>
						<input className="border p-2 rounded-lg placeholder:text-xs" type="password" placeholder="7 + characters required" name="password" value={data.password} onChange={input} />
					</div>
					<div className="flex flex-col space-y-1 ">
						<span>Confirm Password</span>
						<input
							className="border p-2 rounded-lg placeholder:text-xs"
							type="password"
							placeholder="7 + characters required"
							name="confirm_password"
							value={data.confirm_password}
							onChange={input}
						/>
					</div>
					<div className="flex justify-between items-center ">
						<div className="flex space-x-2 items-center">
							<button
								className={`w-10 min-w-[40px] flex items-center rounded-full transition-colors hover:cursor-pointer ${isChecked ? "bg-violet-600" : "bg-slate-400 "}`}
								onClick={(e) => {
									e.preventDefault();
									setChecked(!isChecked);
								}}
							>
								<div className={`bg-white h-5 w-5 rounded-full m-[2px]  transition-transform ${isChecked ? "translate-x-4" : "translate-x-0"}`}></div>
							</button>
							<span>Keep me signed in</span>
						</div>
						<div className="phone:hidden landscape:hidden">
							<span>Already have an account? </span>
							<Link className="text-violet-600" href={"/login"}>
								Login
							</Link>
						</div>
					</div>
					<button className="bg-violet-600 text-white p-2 mb-10 rounded w-full ">Register</button>
					<div className="hidden phone:block landscape:block">
						<span>Already have an account? </span>
						<Link className="text-violet-600" href={"/login"}>
							Login
						</Link>
					</div>
				</form>
			</div>

			<Gallery />
		</div>
	);
}
