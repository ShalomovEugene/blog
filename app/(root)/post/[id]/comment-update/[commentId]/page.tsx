import { getCommentById } from "@/actions/post";
import { getUserByEmail } from "@/actions/user";
import CommentForm from "@/components/shared/CommentForm";
import { getSession } from "@/lib/getSession";

const CommentUpdate = async ({
  params: { id, commentId },
}: {
  params: {
    id: string;
    commentId: string;
  };
}) => {
  const session = await getSession();
  const user = session?.user;
  let userData;

  if (user && user.email) {
    userData = await getUserByEmail(user.email);
  } else {
    userData = false;
  }
  const commentData = await getCommentById(id, commentId);

  return (
    <div className="max-w-7xl mx-auto my-4">
      <CommentForm
        commentId={commentId}
        postId={id}
        action="Update"
        commentData={commentData}
      />
    </div>
  );
};

export default CommentUpdate;
