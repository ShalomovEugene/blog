import { getPostById } from "@/actions/post";
import { getUserByEmail } from "@/actions/user";
import CommentForm from "@/components/shared/CommentForm";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import convertDate from "@/helpers/convertDate";
import { getSession } from "@/lib/getSession";
import Image from "next/image";
import Link from "next/link";

import Commets from "@/components/shared/Commets";

const Post = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  const post = await getPostById(id);
  const session = await getSession();
  const user = session?.user;
  const postCreated = convertDate(post.createdAt);
  const postUpdated = convertDate(post.updatedAt);
  let userData;

  if (user && user.email) {
    userData = await getUserByEmail(user.email);
  } else {
    userData = false;
  }

  return (
    <div className="max-w-7xl mx-auto my-4">
      <div className="space-x-2 flex justify-end mb-2">
        {user && post.authorEmail === user.email && (
          <>
            <Button asChild type="button" className="submit-button capitalize">
              <Link href={`/post/${id}/update`}>Update Post</Link>
            </Button>
            <DeleteConfirmation postId={id} />
          </>
        )}
      </div>
      <h2 className="uppercase text-center mb-4 font-bold text-2xl">
        {post.title}
      </h2>
      <div className="float-left mr-4 mb-2 flex flex-col text-sm text-zinc-600">
        <Image
          width={300}
          height={300}
          src={post.secureURL}
          alt="image"
          className="rounded-lg mb-2"
        />
        <span>
          Author:{" "}
          {post.authorFirstName ? post.authorFirstName : post.authorName}
        </span>
        <span>
          {postCreated !== postUpdated
            ? `Updated at: ${postUpdated}`
            : `Created at: ${postCreated}`}
        </span>
      </div>
      <p className="mb-8">{post.content}</p>
      <Commets comments={post.comments} postId={id} user={user?.email} />
      {user && user.email && (
        <div className="flex flex-col my-4">
          <CommentForm postId={id} userData={userData} action="Add" />
        </div>
      )}
    </div>
  );
};

export default Post;
