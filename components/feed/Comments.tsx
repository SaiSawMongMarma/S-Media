import prisma from "@/lib/client";
import CommentList from "./CommentList";

const Comments = async ({ postId }: { postId: number }) => {
  const comments = await prisma.comment.findMany({ where: { postId }, include: { user: true }, orderBy: { createdAt: "desc" } });
  return <CommentList comments={comments} postId={postId} />;
};

export default Comments;

