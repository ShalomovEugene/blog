"use server";
import connectDB from "@/lib/db";
import { User } from "@/models/user.model";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";
import { handleError } from "@/lib/utils";

const login = async (data: any) => {
  const {
    formData: { email, password },
  } = data;

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }
  redirect("/");
};
const register = async (data: any) => {
  const {
    formData: { email, password, lastName, firstName },
  } = data;

  try {
    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new Error("User already exists");
    }

    const hashedPassword = await hash(password, 12);

    await User.create({ firstName, lastName, email, password: hashedPassword });
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }
  redirect("/login");
};

const getAllUsers = async () => {
  await connectDB();
  const users = await User.find({});
  return users;
};

const getUserByEmail = async (email: string) => {
  try {
    await connectDB();

    const user = await User.findOne({ email: email });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

export { register, login, getAllUsers, getUserByEmail };
