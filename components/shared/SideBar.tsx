import { getSession } from "@/lib/getSession";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { getUserByEmail } from "@/actions/user";

// async function getUser() {
//   const session = await getSession();
//   const userSession = session?.user;
//   if (userSession && userSession.email) {
//     const user = await getUserByEmail(userSession.email);
//     return user;
//   }
//   return null;
// }

const SideBar = ({ user }: any) => {
  // const user = use(getUser());

  return (
    <aside className="ml-4 col-span-2 h-screen border border-gray-300 p-2 rounded-lg mb-4">
      {user ? (
        <div className="flex flex-col">
          <div className="flex items-center mb-4 border-b px-2 pb-2">
            {user.image && (
              <Image
                width={30}
                height={30}
                src={user.image}
                alt="photo"
                className="rounded-full"
              />
            )}

            <h4 className="ml-2 text-md text-stone-600">
              {user.name ? user.name : user.firstName}
            </h4>
          </div>
          <nav>
            <ul className="space-y-2 text-blue-700 flex flex-col items-start">
              <li className="transition duration-300 transform hover:translate-x-1 rounded-lg">
                <Link
                  href="/create-post"
                  className="uppercase hover:text-blue-900 flex px-2 py-2"
                >
                  Create Post
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <h3 className="text-sm uppercase text-stone-600 my-2">
          Please{" "}
          <Link href="/login" className="text-blue-600">
            login
          </Link>{" "}
          to create a post!
        </h3>
      )}
    </aside>
  );
};
export default SideBar;
