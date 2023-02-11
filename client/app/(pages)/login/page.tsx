/* eslint-disable react/no-unescaped-entities */
"use client";
import { ChangeEvent, useState } from "react";
import Gallery from "../../../components/common/gallery";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("...");
	const [isChecked, setChecked] = useState(false);
	const [data, setData] = useState({
		email: "",
		password: "",
	});
	const instance = axios.create({
		baseURL: "http://localhost:4000",
		withCredentials: true,
	});
	function input(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setData((state) => ({
			...state,
			[name]: value,
		}));
	}

	function login(e: any) {
		e.preventDefault();
		setError(false);
		setMessage("message");
		setLoading(true);
		instance
			.post("/login", data)
			.then(() => {
				setError(false);
				setMessage("...");
				setLoading(true);
				router.push("/");
			})
			.catch((err) => {
				setError(true);
				setLoading(false);
				setMessage(err.response.data);
				setLoading(false);
			});
	}

	return (
		<div className="h-screen w-screen flex text-xs relative bg-neutral-50">
			<div className=" w-[38vw] min-w-[500px] p-14 margin-b-24 flex items-center justify-center flex-col phone:w-full phone:min-w-[100%] phone:landscape:block overflow-y-auto landscape:min-w-[400px] landscape:p-10">
				<form className="space-y-5 text-neutral-800 w-[80%] flex flex-col phone:w-[100%]">
					<span className="text-neutral-700 font-bold text-4xl">Login</span>
					<div className="flex flex-col space-y-1">
						<span>Email Address</span>
						<input className="border p-2 rounded-lg placeholder:text-xs" type="email" placeholder="example@mail.com" name="email" value={data.email} onChange={input} />
					</div>
					<div className="flex flex-col space-y-1 ">
						<span>Password</span>
						<input className="border p-2 rounded-lg placeholder:text-xs" type="password" placeholder="password" name="password" value={data.password} onChange={input} />
					</div>
					<div className="flex justify-between items-center">
						<div className="flex space-x-2 items-center">
							<button
								className={`w-10 min-w-[40px] flex items-center rounded-full transition-colors hover:cursor-pointer ${isChecked ? "bg-violet-600" : "bg-neutral-400 "}`}
								onClick={(e) => {
									e.preventDefault();
									setChecked(!isChecked);
								}}>
								<div className={`bg-white h-5 w-5 rounded-full m-[2px]  transition-transform ${isChecked ? "translate-x-4" : "translate-x-0"}`}></div>
							</button>
							<span>Keep me signed in</span>
						</div>
						<span className=" text-violet-600">Forgot password</span>
					</div>
					<button className="bg-violet-600 text-white p-2 mb-10 rounded w-full " onClick={login}>
						<span>{loading ? "Loading..." : "Register"}</span>
					</button>
					<div className="my-5 ">
						<span>Don't have an account? </span>
						<Link href={"/register"} className="text-violet-600">
							Sign up
						</Link>
					</div>
					<span className={`w-full justify-center flex text-red-500 ${error ? "visible" : "invisible"}`}>{message}</span>
				</form>
			</div>
			<Gallery />
		</div>
	);
}
