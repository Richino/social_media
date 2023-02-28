"use client";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import message from "../../../messagebox";
import User from "../../../components/home/user";
import Avatar from "../../../components/common/avatar";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BsEmojiSmile, BsChevronLeft } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
export default function Page() {
	const [data, setData] = useState<any>([]);
	const [defaultScreen, setDefaultScreen] = useState(true);
	const [index, setIndex] = useState(-1);
	const [showPicker, setShowPicker] = useState(false);
	const [text, setText] = useState("");
	const ref = useRef<HTMLDivElement>(null);
	const input = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);
	useEffect(() => ref.current?.scrollTo(0, 1000), [index]);
	useEffect(() => setData(message), [data]);
	return (
		<div className="message-box flex  h-[calc(100%-58px)] w-full flex-col items-center justify-center  p-5 phone:h-[calc(100%-50px)] tablet:p-0">
			<div className="message-container flex h-full w-full max-w-[1000px] border border-neutral-200 bg-white phone:relative phone:block phone:border-0">
				<div
					className={`users h-full min-w-[380px] max-w-[380px] overflow-y-auto border-r  border-neutral-200  phone:min-h-full phone:min-w-full phone:max-w-full  phone:${
						index !== -1 && "hidden"
					}`}>
					<div className="message-button-circle border-nuetral-200 sticky top-0 mb-5 hidden min-h-[83px] place-items-center border-b bg-white p-5 py-2 phone:grid">
						<span className="text-base">
							<b>Messages</b>
						</span>
						<IoIosAddCircleOutline size={32} />
					</div>
					{data?.map((key: any, index: number) => {
						let string = "";

						if (key.messages[0].me === false) {
							string = key.messages[0].message;
						} else {
							string = "Active 2h ago";
						}

						return (
							<div
								key={index}
								className="p-5 py-2 hover:cursor-pointer hover:bg-neutral-200"
								onClick={() => {
									setDefaultScreen(false);
									setIndex(index);
								}}>
								<User fullname={key.fullname} usernameOrText={string} avatar={key.avatar} />
							</div>
						);
					})}
				</div>
				<div
					className={`left-0 h-full  w-full overflow-hidden phone:absolute phone:top-0  phone:z-50 phone:${
						index < 0 && "hidden"
					} ${index < 0 && "new-message"} `}>
					<div
						className={`${
							defaultScreen ? "flex" : "hidden"
						} new-message h-full flex-col items-center justify-center gap-5 phone:hidden`}>
						<div className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-4 border-black p-5">
							<IoPaperPlaneOutline size={50} />
						</div>
						<button className="rounded-md bg-violet-500 px-6 py-3 text-base text-white">New message</button>
					</div>
					<div
						className={`${
							defaultScreen ? "hidden" : "flex"
						}  messages relative h-full flex-col overflow-hidden`}>
						<div className="message-user-title absolute top-0  z-50 w-full border-b border-neutral-200 bg-white p-5 phone:grid phone:place-items-center">
							<div className="message-user-cheveron left-[20px] phone:absolute  overPhone2:hidden">
								<BsChevronLeft
									size={24}
									className=" hover:cursor-pointer"
									onClick={() => setIndex(-1)}
								/>
							</div>
							<div className="flex items-center gap-2">
								<Avatar story={false} height={42} width={42} image={data[index]?.avatar} />
								<span>
									<b>{data[index]?.fullname}</b>
								</span>
							</div>
						</div>
						<div
							ref={ref}
							className=" mt-[83px] mb-[65px] flex h-full flex-col-reverse gap-5 overflow-y-scroll bg-white  p-5 ">
							{data[index]?.messages.map((key: any, position: number) => {
								return (
									<div key={position} className="w-full">
										<p
											className={`${
												key.me
													? "float-right bg-neutral-100"
													: "float-left border border-neutral-200"
											}  w-[45%] rounded-3xl  p-5 phone:w-[60%]`}>
											{key.message}
										</p>
									</div>
								);
							})}
						</div>
						<div className="absolute bottom-0 flex w-full items-center  justify-between  gap-2 border-t border-neutral-200 bg-white p-5 ">
							<input
								type="text"
								placeholder="Enter message here..."
								className="h-full w-full text-sm placeholder:text-neutral-400"
								value={text}
								onChange={input}
							/>
							<button className="text-violet-500">
								<IoPaperPlaneOutline size={24} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
