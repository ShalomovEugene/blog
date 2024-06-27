"use client";
import SideBar from "@/components/shared/SideBar";
import Articles from "@/components/shared/Articles";
import { IPosts } from "@/models/post.model";
import { IUser } from "@/types";
import { useAppSelector } from "@/redux";
import { selectUser, selectUserLoading } from "@/redux/selectors";
import { Loader } from "lucide-react";

const Wrapper = ({ user, posts }: { user: IUser; posts: IPosts[] }) => {
  const users = useAppSelector(selectUser);
  const loadingUsers = useAppSelector(selectUserLoading);
  !loadingUsers && console.log(users.data);

  return !loadingUsers ? (
    <>
      <SideBar user={user} />
      <Articles posts={posts} />
    </>
  ) : (
    <Loader />
  );
};

export default Wrapper;
