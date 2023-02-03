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
		<div className="h-[calc(100%-58px)] w-full  flex flex-col justify-center items-center p-5  tablet:p-0 phone:h-[calc(100%-50px)] message-box">
			<div className="max-w-[1000px] h-full w-full bg-white border border-neutral-200 flex phone:border-0 phone:block phone:relative message-container">
				<div
					className={`min-w-[380px] max-w-[380px] h-full border-r border-neutral-200 overflow-y-auto  phone:min-h-full  phone:min-w-full phone:max-w-full users  phone:${
						index !== -1 && "hidden"
					}`}
				>
					<div className="p-5 py-2 min-h-[83px] phone:grid hidden place-items-center sticky top-0 message-button-circle border-b border-nuetral-200 mb-5 bg-white">
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
								className="p-5 py-2 hover:bg-neutral-200 hover:cursor-pointer"
								onClick={() => {
									setDefaultScreen(false);
									setIndex(index);
								}}
							>
								<User fullname={key.fullname} usernameOrText={string} avatar={key.avatar} />
							</div>
						);
					})}
				</div>
				<div className={`w-full h-full  overflow-hidden phone:absolute phone:top-0 phone:z-50  left-0 phone:${index < 0 && "hidden"} ${index < 0 && "new-message"} bg-black`}>
					<div className={`${defaultScreen ? "flex" : "hidden"} items-center justify-center flex-col gap-5 h-full phone:hidden new-message`}>
						<div className="rounded-full border-4 border-black p-5 flex items-center justify-center h-[120px] w-[120px]">
							<IoPaperPlaneOutline size={50} />
						</div>
						<button className="bg-violet-500 text-white px-6 py-3 rounded-md text-base">New message</button>
					</div>
					<div className={`${defaultScreen ? "hidden" : "flex"}  flex-col h-full relative overflow-hidden messages`}>
						<div className="absolute top-0 p-5  bg-white border-b border-neutral-200 w-full z-50 phone:grid phone:place-items-center message-user-title">
							<div className="phone:absolute message-user-cheveron left-[20px]  overPhone2:hidden">
								<BsChevronLeft size={24} className=" hover:cursor-pointer" onClick={() => setIndex(-1)} />
							</div>
							<div className="flex items-center gap-2">
								<Avatar story={false} height={42} width={42} image={data[index]?.avatar} />
								<span>
									<b>{data[index]?.fullname}</b>
								</span>
							</div>
						</div>
						<div ref={ref} className=" flex flex-col-reverse gap-5 p-5 h-full mt-[83px] mb-[65px] overflow-y-scroll  bg-white ">
							{data[index]?.messages.map((key: any, position: number) => {
								return (
									<div key={position} className="w-full">
										<p className={`${key.me ? "bg-neutral-100 float-right" : "border border-neutral-200 float-left"}  p-5 rounded-3xl  w-[45%] phone:w-[60%]`}>{key.message}</p>
									</div>
								);
							})}
						</div>
						<div className="border-t absolute bottom-0 bg-white border-neutral-200  w-full  flex justify-between p-5 gap-2 items-center ">
							<input type="text" placeholder="Enter message here..." className="w-full h-full text-sm placeholder:text-neutral-400" value={text} onChange={input} />
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
