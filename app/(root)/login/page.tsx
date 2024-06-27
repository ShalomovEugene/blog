import { IconBrandGithub } from "@tabler/icons-react";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/shared/LoginForm";

const Login = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/");

  return (
    <div className="mt-10 max-w-md w-full mx-auto flex flex-col ">
      <LoginForm />
      <form
        className="self-center"
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <Button type="submit">
          <IconBrandGithub className="h-4 w-4" />
          <span className="ml-2">Sign in with Github</span>
        </Button>
      </form>
    </div>
  );
};

export default Login;
