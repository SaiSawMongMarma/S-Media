"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";
import CloudinaryUpload from "./CloudinaryUpload";

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [img, setImg] = useState("");
  const [uploadError, setUploadError] = useState("");

  if (!isLoaded) {
    return "Loading...";
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* AVATAR */}
      <Image
        src={user?.imageUrl || "/noAvatar.png"}
        alt=""
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full"
      />
      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form action={(formData) => addPost(formData, img)} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <textarea
            placeholder="What's on your mind?"
            className="min-h-24 sm:min-h-0 flex-1 bg-slate-100 rounded-lg p-3"
            name="desc"
          ></textarea>
          <div className="">
            <Image
              src="/emoji.png"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer self-end"
            />
            <AddPostButton />
          </div>
        </form>
        {/* POST OPTIONS */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <CloudinaryUpload onUploaded={(url) => { setImg(url); setUploadError(""); }}><div className="flex items-center gap-2"><Image src="/addimage.png" alt="" width={20} height={20} />Photo</div></CloudinaryUpload>
          {img && <div className="flex items-center gap-2 text-xs text-gray-500"><Image src={img} alt="Selected post image" width={40} height={40} className="h-10 w-10 rounded object-cover" /><button type="button" className="text-red-500" onClick={() => setImg("")}>Remove</button></div>}
          {uploadError && <span className="text-xs text-red-500">{uploadError}</span>}
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addVideo.png" alt="" width={20} height={20} />
            Video
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" alt="" width={20} height={20} />
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addevent.png" alt="" width={20} height={20} />
            Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
