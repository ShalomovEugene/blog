"use client";
import { IPosts } from "@/models/post.model";
import Image from "next/image";
import Link from "next/link";

const Articles = ({ posts }: { posts: IPosts[] }) => {
  const postsList = posts.map((post) => (
    <div key={post._id.toString()}>
      <Link href={`post/${post._id}`}>
        <article className="transition duration-300 transform hover:-translate-y-1 ">
          <h3 className="uppercase text-center font-bold mb-2">{post.title}</h3>
          <Image
            width={300}
            height={150}
            src={post.secureURL}
            alt="image"
            className="rounded-lg mb-2 h-52 w-full object-cover"
          />
        </article>
      </Link>
    </div>
  ));

  return (
    <div className="col-span-8 grid grid-cols-4 auto-rows-min gap-2 mt-4">
      {postsList}
    </div>
  );
};

export default Articles;
