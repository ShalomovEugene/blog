"use server";
import connectDB from "@/lib/db";
import { User } from "@/models/user.model";
import { redirect } from "next/navigation";
import { Post } from "@/models/post.model";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { AddCommentParams, AddPostParams, UpdateCommentParams } from "@/types";

const populateUser = (query: any) =>
  query.populate({
    path: "authorId",
    model: User,
    select: "_id email image",
  });

const addPost = async ({ post, userId, path }: AddPostParams) => {
  try {
    await connectDB();

    const author = await User.findById(userId);

    if (!author) {
      throw new Error("User not found");
    }
    const newPost = await Post.create({
      ...post,
      authorId: author._id,
      authorEmail: author.email,
      authorImage: author.image,
      authorName: author.name,
      authorFirstName: author.firstName,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newPost));
  } catch (error) {
    handleError(error);
  }
};

const updatePost = async ({ post, userId, path }: AddPostParams) => {
  try {
    await connectDB();

    const postToUpdate = await Post.findById(post._id);

    if (!postToUpdate || postToUpdate.authorId.toHexString() !== userId) {
      throw new Error("Unauthorized or image not found");
    }

    const updatedPost = await Post.findByIdAndUpdate(postToUpdate._id, post, {
      new: true,
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedPost));
  } catch (error) {
    handleError(error);
  }
};

const deletePost = async (postId: string) => {
  try {
    await connectDB();

    await Post.findByIdAndDelete(postId);
  } catch (error) {
    handleError(error);
  } finally {
    redirect("/");
  }
};

const getPostById = async (postId: string) => {
  try {
    await connectDB();

    const post = await populateUser(Post.findById(postId));

    if (!post) throw new Error("Post not found");

    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    handleError(error);
  }
};

const getAllPosts = async () => {
  await connectDB();
  const posts = await Post.find();

  return JSON.parse(JSON.stringify(posts));
};

const addComment = async ({ comment, postId, userData }: AddCommentParams) => {
  try {
    await connectDB();

    const postToUpdate = await Post.findById(postId);
    if (!postToUpdate) {
      throw new Error("Post not found");
    }

    postToUpdate.comments.push({
      comment: comment,
      userId: userData,
      userName: userData.name,
      userFirstName: userData.firstName,
      userEmail: userData.email,
      userImage: userData.image,
      createdAt: new Date(),
    });

    const updatedPost = await postToUpdate.save();

    revalidatePath("/");

    return JSON.parse(JSON.stringify(updatedPost));
  } catch (error) {
    handleError(error);
  }
};

const updateComment = async ({
  comment,
  postId,
  commentId,
}: UpdateCommentParams) => {
  try {
    await connectDB();

    const postToUpdate = await Post.findById(postId).populate(
      "comments.userId"
    );
    if (!postToUpdate) {
      throw new Error("Post not found");
    }

    const commentToUpdate = postToUpdate.comments.id(commentId);
    if (commentToUpdate) {
      commentToUpdate.comment = comment;
      commentToUpdate.updatedAt = new Date();
    } else {
      throw new Error("Comment not found");
    }

    const updatedPost = await postToUpdate.save();

    revalidatePath("/");
    return JSON.parse(JSON.stringify(updatedPost));
  } catch (error) {
    handleError(error);
  }
};

const deleteCommmet = async (commentId: string, postId: string) => {
  try {
    await connectDB();

    const postToUpdate = await Post.findById(postId);
    if (!postToUpdate) {
      throw new Error("Post not found");
    }

    const commentIndex = postToUpdate.comments.findIndex(
      (comment: any) => comment._id.toString() === commentId
    );
    if (commentIndex === -1) {
      throw new Error("Comment not found");
    }

    postToUpdate.comments.splice(commentIndex, 1);

    await postToUpdate.save();

    revalidatePath("/");
  } catch (error) {
    handleError(error);
  }
};

const getCommentById = async (postId: string, commentId: string) => {
  try {
    await connectDB();
    const post = await populateUser(Post.findById(postId));

    if (!post) throw new Error("Post not found");

    const comment = post.comments.find(
      (c: any) => c._id.toString() === commentId
    );

    if (!comment) throw new Error("Comment not found");

    return JSON.parse(JSON.stringify(comment));
  } catch (error) {
    handleError(error);
  }
};

export {
  addPost,
  updatePost,
  deletePost,
  getPostById,
  getAllPosts,
  addComment,
  updateComment,
  getCommentById,
  deleteCommmet,
};
