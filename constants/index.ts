import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(4, {
    message: "Title must be at least 4 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  publicId: z.string().min(1, {
    message: "You need to choose an image.",
  }),
});

export const defaultValuesPostFrom = {
  title: "",
  content: "",
  publicId: "",
};

export const formSchemaLogin = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export const defaultValuesLoginFrom = {
  email: "",
  password: "",
};

export const formSchemaRegistration = z.object({
  firstName: z.string().min(5, {
    message: "First name must be at least 5 characters.",
  }),
  lastName: z.string().min(5, {
    message: "Last name must be at least 5 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export const defaultValuesFormRegistration = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const formSchemaComment = z.object({
  comment: z.string().min(5, {
    message: "Comment must be at least 5 characters.",
  }),
});

export const defaultValuesFormComment = {
  comment: "",
};

formSchemaComment;
