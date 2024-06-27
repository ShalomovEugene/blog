/* eslint-disable no-unused-vars */
import { ObjectId } from "mongodb";
export type AddPostParams = {
  post: {
    _id?: ObjectId;
    title: string;
    content: string;
    publicId: string;
    secureURL: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
  userId: string;
  path: string;
};

export type AddCommentParams = {
  comment: string;
  userData: IUser;
  commentId?: string;
  updatedAt?: Date;
  postId: string;
};

export type UpdateCommentParams = {
  comment: string;
  postId: string;
  commentId?: string;
  updatedAt?: Date;
};

export type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setPost: React.Dispatch<any>;
  publicId: string;
  post: any;
};

export interface IUser {
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  image?: string;
}
