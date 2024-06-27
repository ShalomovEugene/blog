import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    image: { type: String },
  },
  { collection: "users" }
);

export const User = models?.User || model("User", userSchema);
