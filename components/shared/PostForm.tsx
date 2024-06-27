"use client";

import { defaultValuesPostFrom, formSchema } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addPost, updatePost } from "@/actions/post";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { CustomField } from "./CustomField";
import { Input } from "../ui/input";
import MediaUploader from "./MediaUploader";

import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const PostForm = ({ action, data = null, userId }: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState(data);
  const router = useRouter();

  const initialValues =
    data && action === "Update"
      ? {
          title: data?.title,
          content: data?.content,
          publicId: data?.publicId,
        }
      : defaultValuesPostFrom;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    if (data || post) {
      const postData = {
        title: values.title,
        publicId: post?.publicId,
        secureURL: post?.secureURL,
        content: values.content,
        updatedAt: new Date(),
      };

      if (action === "Create") {
        try {
          const newPost = await addPost({
            post: postData,
            userId,
            path: "/",
          });
          if (newPost) {
            form.reset();
            setPost(data);
            router.push(`/post/${newPost._id}`);
          }
        } catch (error) {
          console.log(error);
        }
      }

      if (action === "Update") {
        try {
          const updatedPost = await updatePost({
            post: {
              ...postData,
              _id: data._id,
            },
            userId,
            path: `/post/${data._id}`,
          });

          if (updatedPost) {
            router.push(`/post/${updatedPost._id}`);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CustomField
          control={form.control}
          name="title"
          formLabel="Post Title"
          className="w-full"
          render={({ field }) => <Input {...field} className="input-field" />}
        />
        <div className="grid gap-2 grid-cols-7">
          <CustomField
            control={form.control}
            name="publicId"
            className="grow col-span-2"
            formLabel="Post Thumbnail"
            render={({ field }) => (
              <MediaUploader
                onValueChange={field.onChange}
                setPost={setPost}
                publicId={field.value}
                post={post}
              />
            )}
          />
          <CustomField
            control={form.control}
            name="content"
            formLabel="Content area"
            className="flex flex-col grow col-span-5"
            render={({ field }) => (
              <Textarea {...field} className="textarea-field grow" />
            )}
          />
        </div>

        <Button
          type="submit"
          className="submit-button capitalize"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : `${action} Post`}
        </Button>
      </form>
    </Form>
  );
};

export default PostForm;
