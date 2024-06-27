import { getPostById } from "@/actions/post";
import { getUserByEmail } from "@/actions/user";
import PostForm from "@/components/shared/PostForm";
import { getSession } from "@/lib/getSession";
import Link from "next/link";

const PostUpdate = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  const session = await getSession();
  const userSession = session?.user;

  if (!userSession || !userSession.email) {
    return (
      <div className="max-w-7xl mx-auto my-4 text-center uppercase">
        <h2 className="text-sm uppercase text-stone-600 text-lg">
          Please{" "}
          <Link href="/login" className="text-blue-600">
            login
          </Link>{" "}
          to create a post!
        </h2>
      </div>
    );
  }
  const user = await getUserByEmail(userSession.email);
  const post = await getPostById(id);
  return (
    <div className="max-w-7xl mx-auto my-4">
      <PostForm action="Update" userId={user._id} data={post} />
    </div>
  );
};

export default PostUpdate;