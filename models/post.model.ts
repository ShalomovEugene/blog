import { Document, Schema, model, models, Types } from "mongoose";

export interface IPosts extends Document {
  _id: Types.ObjectId;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  publicId: string;
  secureURL: string;
  authorId: Types.ObjectId;
  authorEmail: string;
  authorImage: string;
  authorName: string;
  authorFirstName: string;
  comment?: string;
}

const commentSchema = new Schema({
  comment: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  userName: { type: String },
  userFirstName: { type: String },
  userEmail: { type: String },
  userImage: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const postSchema = new Schema(
  {
    title: { type: String },
    content: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    publicId: { type: String, required: true },
    secureURL: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User" },
    authorEmail: { type: String },
    authorImage: { type: String },
    authorName: { type: String },
    authorFirstName: { type: String },
    comments: [commentSchema],
  },
  { collection: "posts" }
);

export const Post = models?.Post || model("Post", postSchema);
