import { getAllPosts } from "@/actions/post";

import { getSession } from "@/lib/getSession";
import { getUserByEmail } from "@/actions/user";
import Wrapper from "@/components/shared/Wrapper";

const Home = async () => {
  const posts = await getAllPosts();
  const session = await getSession();
  const userSession = session?.user;
  let user;

  if (userSession && userSession.email) {
    user = await getUserByEmail(userSession.email);
  } else {
    user = false;
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <Wrapper user={user} posts={posts} />
    </div>
  );
};

export default Home;
