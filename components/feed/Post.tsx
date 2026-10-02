import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { Suspense } from "react";
import Comments from "./Comments";
import PostInfo from "./PostInfo";
import PostInteraction from "./PostInteraction";

type FeedPost = {
  id: number;
  desc: string;
  img: string | null;
  user: { id: string; username: string; avatar: string | null; name: string | null; surname: string | null };
  likes: { userId: string }[];
  _count: { comments: number };
};

const Post = async ({ post }: { post: FeedPost }) => {
  const { userId } = await auth();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src={post.user.avatar || "/noAvatar.png"} width={40} height={40} alt="" className="w-10 h-10 rounded-full" />
          <span className="font-medium">{post.user.name && post.user.surname ? `${post.user.name} ${post.user.surname}` : post.user.username}</span>
        </div>
        {userId === post.user.id && <PostInfo postId={post.id} />}
      </div>
      <div className="flex flex-col gap-4">
        {post.img && <div className="w-full min-h-64 sm:min-h-96 relative"><Image src={post.img} fill sizes="(max-width: 640px) 100vw, 600px" className="object-cover rounded-md" alt="" /></div>}
        <p>{post.desc}</p>
      </div>
      <Suspense fallback="Loading..."><PostInteraction postId={post.id} likes={post.likes.map((like) => like.userId)} commentNumber={post._count.comments} /></Suspense>
      <Suspense fallback="Loading..."><Comments postId={post.id} /></Suspense>
    </div>
  );
};

export default Post;

