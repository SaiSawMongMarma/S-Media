import Image from "next/image";
import Link from "next/link";
import ProfileCard from "./ProfileCard";
import Ad from "../Ad";

const items = [
  ["posts.png", "My Posts"], ["activity.png", "Activity"], ["market.png", "Marketplace"],
  ["events.png", "Events"], ["albums.png", "Albums"], ["videos.png", "Videos"],
  ["news.png", "News"], ["courses.png", "Courses"], ["lists.png", "Lists"], ["settings.png", "Settings"],
] as const;

const LeftMenu = ({ type = "home" }: { type?: "home" | "profile" }) => (
  <div className="flex flex-col gap-6">
    <ProfileCard />
    <nav data-menu-type={type} className="p-4 bg-white rounded-lg shadow-md text-sm text-gray-500 flex flex-col gap-2">
      {items.map(([icon, label]) => <Link href="/" key={label} className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"><Image src={`/${icon}`} alt="" width={20} height={20} /><span>{label}</span></Link>)}
    </nav>
    <Ad size="sm" />
  </div>
);

export default LeftMenu;

