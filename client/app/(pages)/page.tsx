import Activity from "../../components/home/activity";
import Explore from "../../components/home/explore";
import Messages from "../../components/home/messages";
import PostFeed from "../../components/home/postFeed";
import Suggestion from "../../components/home/suggestion";
import Stories from "../../components/home/stories";

export default function Home() {
	return (
		<div className="flex w-full justify-center   gap-5 ">
			<div className=" cool sticky  top-[59px]  bottom-0 w-[250px] shrink-0 space-y-5 overflow-y-auto py-5 tablet:hidden">
				<Activity />
				<Explore />
			</div>
			<div className="jusify-center   flex  h-max w-[500px] flex-col items-center gap-5 py-5 nestHub:w-[400px] tablet:phone:w-full">
				<Stories />
				<PostFeed
					fullname="Joseph Rogan"
					usernameOrText="@jrkrogan258"
					avatar="/assets/users/1.jpg"
					post="/assets/feeds/joseph/1.png"
					aspectRatio="aspect-[4/5]"
				/>
				<PostFeed
					fullname="Joseph Rogan"
					usernameOrText="@jrkrogan258"
					avatar="/assets/users/1.jpg"
					post="/assets/feeds/joseph/1.png"
					aspectRatio="aspect-square"
				/>
			</div>
			<div className="cool sticky top-[59px] h-full w-[250px] shrink-0 space-y-5 overflow-y-auto py-5 tablet:hidden">
				<Messages />
				<Suggestion />
			</div>
		</div>
	);
}
