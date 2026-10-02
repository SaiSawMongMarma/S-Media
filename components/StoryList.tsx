"use client";

import { addStory, deleteStory } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useOptimistic, useState } from "react";
import CloudinaryUpload from "./CloudinaryUpload";

type StoryItem = {
  id: number;
  img: string;
  userId: string;
  user: { username: string; name: string | null; avatar: string | null };
};

const StoryList = ({ stories, userId }: { stories: StoryItem[]; userId: string }) => {
  const { user } = useUser();
  const [image, setImage] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [storyState, setStoryState] = useState(stories);
  const [optimisticStories, addOptimisticStory] = useOptimistic(storyState, (state, value: StoryItem) => [value, ...state]);

  const add = async () => {
    if (!image) return;
    setUploadError("");
    const optimistic = { id: -Date.now(), img: image, userId, user: { username: user?.username || "You", name: user?.firstName || null, avatar: user?.imageUrl || null } };
    addOptimisticStory(optimistic);
    try {
      const created = await addStory(image);
      if (created) setStoryState((previous) => [created, ...previous]);
      setImage("");
    } catch (error) {
      console.error("Unable to create story", error);
    }
  };

  return <>
    <div className="flex flex-col items-center gap-2 cursor-pointer relative"><CloudinaryUpload onUploaded={(url) => { setUploadError(""); setImage(url); }}><Image src={image || user?.imageUrl || "/noAvatar.png"} alt="Add a story" width={80} height={80} className="w-20 h-20 rounded-full ring-2 object-cover" /></CloudinaryUpload>{image ? <form action={add}><button type="submit" className="min-h-8 text-xs bg-blue-500 px-2 rounded-md text-white">Send</button></form> : <span className="font-medium">Add a Story</span>}{uploadError && <span className="max-w-24 text-center text-[10px] text-red-500">{uploadError}</span>}</div>
    {optimisticStories.map((story) => <div className="flex flex-col items-center gap-2" key={`${userId}-${story.id}`}><Image src={story.user.avatar || "/noAvatar.png"} alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2 object-cover" /><span className="font-medium">{story.user.name || story.user.username}</span>{story.userId === userId && <form action={deleteStory.bind(null, story.id)}><button type="submit" className="text-[10px] text-red-500">Delete</button></form>}</div>)}
  </>;
};

export default StoryList;

