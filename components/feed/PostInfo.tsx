"use client";

import { deletePost } from "@/lib/actions";
import Image from "next/image";
import { useState } from "react";

const PostInfo = ({ postId }: { postId: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((value) => !value)} aria-label="Post options">
        <Image src="/more.png" width={16} height={16} alt="" />
      </button>
      {open && (
        <div className="absolute top-6 right-0 bg-white p-4 w-32 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-30">
          <form action={deletePost.bind(null, postId)}><button type="submit" className="text-red-500">Delete</button></form>
        </div>
      )}
    </div>
  );
};

export default PostInfo;

