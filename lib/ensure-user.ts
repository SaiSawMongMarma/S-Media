import { currentUser } from "@clerk/nextjs/server";
import prisma from "./client";

export const ensureCurrentUser = async (userId: string) => {
  const clerkUser = await currentUser();
  const username = clerkUser?.username || userId;

  return prisma.user.upsert({
    where: { id: userId },
    create: { id: userId, username, avatar: clerkUser?.imageUrl || "/noAvatar.png", cover: "/noCover.png" },
    update: { username, avatar: clerkUser?.imageUrl || "/noAvatar.png" },
  });
};
