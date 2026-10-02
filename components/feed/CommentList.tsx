"use client";

import { addComment } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type CommentWithUser = {
  id: number;
  desc: string;
  user: { id: string; username: string; avatar: string | null; name: string | null; surname: string | null };
};

const CommentList = ({ comments, postId }: { comments: CommentWithUser[]; postId: number }) => {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");
  const [optimisticComments, addOptimisticComment] = useOptimistic(commentState, (state, value: CommentWithUser) => [value, ...state]);

  const add = async () => {
    const text = desc.trim();
    if (!user || !text) return;
    const optimistic = { id: -Date.now(), desc: text, user: { id: user.id, username: user.username || "You", avatar: user.imageUrl, name: user.firstName, surname: user.lastName } };
    addOptimisticComment(optimistic);
    setDesc("");
    try {
      const created = await addComment(postId, text);
      setCommentState((previous) => [created, ...previous]);
    } catch (error) {
      console.error("Unable to add comment", error);
    }
  };

  return (
    <>
      {user && <div className="flex items-center gap-4">
        <Image src={user.imageUrl || "/noAvatar.png"} alt="" width={32} height={32} className="w-8 h-8 rounded-full" />
        <form action={add} className="flex-1 flex items-center bg-slate-100 rounded-xl text-sm px-6 py-2">
          <input value={desc} onChange={(event) => setDesc(event.target.value)} placeholder="Write a comment..." className="bg-transparent outline-none flex-1" />
          <button type="submit" className="text-blue-500">Send</button>
        </form>
      </div>}
      <div>{optimisticComments.map((comment) => <div className="flex gap-4 mt-6" key={comment.id}>
        <Image src={comment.user.avatar || "/noAvatar.png"} alt="" width={40} height={40} className="w-10 h-10 rounded-full" />
        <div><span className="font-medium">{comment.user.name && comment.user.surname ? `${comment.user.name} ${comment.user.surname}` : comment.user.username}</span><p>{comment.desc}</p></div>
      </div>)}</div>
    </>
  );
};

export default CommentList;

