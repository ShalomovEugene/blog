import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { compare } from "bcryptjs";
import connectDB from "./lib/db";
import { User } from "./models/user.model";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email & password");
        }

        await connectDB();

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new Error("Invalid email or password");
        }

        if (!user.password) {
          throw new Error("Invalid email or password");
        }

        const isMatched = await compare(password, user.password);

        if (!isMatched) {
          throw new Error("Password did not matched");
        }

        const userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          id: user._id,
        };

        return userData;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }: any) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token, trigger, session }) => {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },

    signIn: async ({ user, account }) => {
      if (account?.provider === "github") {
        try {
          await connectDB();
          const { email, name, image } = user;
          const alreadyUser = await User.findOne({ email });
          if (!alreadyUser) {
            await User.create({ email, name, image });
          }
          return true;
        } catch (error: any) {
          throw new Error(`Error: ${error.message}`);
        }
      }
      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
  },
});
