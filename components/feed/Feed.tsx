import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import Post from "./Post";

const Feed = async ({ username }: { username?: string }) => {
  const { userId } = await auth();
  if (!username && !userId) return <div className="p-4 bg-white rounded-lg shadow-md">Sign in to see your feed.</div>;

  const following = username ? [] : await prisma.follower.findMany({ where: { followerId: userId! }, select: { followingId: true } });
  const userIds = username ? undefined : [userId!, ...following.map((item) => item.followingId)];
  const posts = await prisma.post.findMany({
    where: username ? { user: { username } } : { userId: { in: userIds } },
    include: { user: true, likes: { select: { userId: true } }, _count: { select: { comments: true } } },
    orderBy: { createdAt: "desc" },
  });

  return <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">{posts.length ? posts.map((post) => <Post key={post.id} post={post} />) : "No posts found!"}</div>;
};

export default Feed;

