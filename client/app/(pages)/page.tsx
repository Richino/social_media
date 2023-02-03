import Activity from "../../components/home/activity";
import Explore from "../../components/home/explore";
import Messages from "../../components/home/messages";
import PostFeed from "../../components/home/postFeed";
import Suggestion from "../../components/home/suggestion";
import Stories from "../../components/home/stories";

export default function Home() {
	return (
		<div className="w-full flex gap-5   justify-center ">
			<div className=" cool w-[250px]  space-y-5  shrink-0 py-5 sticky top-[59px] bottom-0 overflow-y-auto tablet:hidden">
				<Activity />
				<Explore />
			</div>
			<div className="h-max   py-5  w-[500px] flex jusify-center flex-col items-center gap-5 nestHub:w-[400px] tablet:phone:w-full">
				<Stories />
				<PostFeed fullname="Joseph Rogan" usernameOrText="@jrkrogan258" avatar="/assets/users/1.jpg" post="/assets/feeds/joseph/1.png" aspectRatio="aspect-[4/5]" />
				<PostFeed fullname="Joseph Rogan" usernameOrText="@jrkrogan258" avatar="/assets/users/1.jpg" post="/assets/feeds/joseph/1.png" aspectRatio="aspect-square" />
			</div>
			<div className="cool h-full w-[250px] shrink-0 sticky top-[59px] py-5 space-y-5 overflow-y-auto tablet:hidden">
				<Messages />
				<Suggestion />
			</div>
		</div>
	);
}
