import Link from "next/link";
import { Button } from "../ui/button";
import { getSession } from "@/lib/getSession";
import { signOut } from "@/auth";
import { use } from "react";
import Image from "next/image";

async function getUser() {
  const session = await getSession();
  const user = session?.user;
  return user;
}

const Header = () => {
  const user = use(getUser());
  return (
    <header className="flex bg-gray-900 text-white mb-2">
      <nav className="mx-auto w-full flex justify-between items-center p-4 max-w-screen-2xl">
        <Link
          href="/"
          className="w-16 h-8 bg-white rounded-lg flex items-center justify-center"
        >
          <Image width={50} height={50} src={"/assets/next.svg"} alt="image" />
        </Link>

        <ul className="space-x-4 flex list-none">
          {!user ? (
            <>
              <li>
                <Button type="button" variant={"ghost"} asChild>
                  <Link href="/login" className="text-md uppercase">
                    Login
                  </Link>
                </Button>
              </li>
              <li>
                <Button type="button" variant={"ghost"} asChild>
                  <Link href="/register" className="text-md uppercase">
                    Register
                  </Link>
                </Button>
              </li>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button
                  type="submit"
                  variant={"ghost"}
                  className="text-md uppercase"
                >
                  Logout
                </Button>
              </form>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
