"use client";
import { IconPencil } from "@tabler/icons-react";
import { DeleteComment } from "@/components/shared/DeleteComment";
import { Button } from "../ui/button";
import convertDate from "@/helpers/convertDate";
import { useRouter } from "next/navigation";

const Commets = ({
  comments,
  postId,
  user,
}: {
  comments: [];
  postId: string;
  user: string | undefined | null;
}) => {
  const router = useRouter();

  const handleEditComment = (commentId: string) => {
    router.push(`/post/${postId}/comment-update/${commentId}`);
  };

  const commentsItems = comments.map((comment: any) => {
    const commentCreated = convertDate(comment.createdAt);
    const commentUpdated = convertDate(comment.updatedAt);
    console.log(comment, postId);
    return (
      <div
        key={comment._id}
        className="border px-4 py-2 rounded-lg my-2 min-w-80 self-end grid grid-cols-2"
      >
        <p className="mb-2 col-span-2">{comment.comment}</p>
        {comment.userEmail === user && (
          <div className="space-x-1 flex items-center">
            <Button
              type="button"
              size="iconXs"
              onClick={() => handleEditComment(comment._id)}
            >
              <IconPencil size={"17"} />
            </Button>

            <DeleteComment commentId={comment._id} postId={postId} />
          </div>
        )}

        <div
          className={`grid-cols-2  ${
            comment.userEmail !== user && `col-span-2`
          }`}
        >
          <p className="text-right text-sm text-zinc-600">
            {commentCreated !== commentUpdated
              ? `Updated at: ${commentUpdated}`
              : `Created at: ${commentCreated}`}
          </p>
          <p className="text-right text-sm text-zinc-600">
            Author:{" "}
            {comment.userName ? comment.userName : comment.userFirstName}
          </p>
        </div>
      </div>
    );
  });

  return <>{commentsItems}</>;
};

export default Commets;
