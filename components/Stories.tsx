import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import { ensureCurrentUser } from "@/lib/ensure-user";
import StoryList from "./StoryList";

type StoryWithUser = {
  id: number;
  img: string;
  userId: string;
  user: { username: string; name: string | null; avatar: string | null };
};

const Stories = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  await ensureCurrentUser(userId);

  let stories: StoryWithUser[] = [];
  try {
    stories = await prisma.story.findMany({
      where: {
        expiresAt: { gt: new Date() },
        OR: [
          { userId },
          { user: { followers: { some: { followerId: userId } } } },
        ],
      },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Unable to load stories", error);
  }

  return <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide"><div className="flex gap-8 w-max"><StoryList stories={stories} userId={userId} /></div></div>;
};

export default Stories;

