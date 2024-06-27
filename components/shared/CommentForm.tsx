"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { defaultValuesFormComment, formSchemaComment } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CustomFieldComment } from "./CustomFieldComment";
import { useState } from "react";
import { addComment, updateComment } from "@/actions/post";
import { Textarea } from "../ui/textarea";

const CommentForm = ({
  postId,
  userData,
  action,
  commentId,
  commentData,
}: any) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const initialValues =
    commentData && action === "Update"
      ? {
          comment: commentData.comment,
        }
      : defaultValuesFormComment;

  const form = useForm<z.infer<typeof formSchemaComment>>({
    resolver: zodResolver(formSchemaComment),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof formSchemaComment>) {
    setIsSubmitting(true);

    if (postId || userData) {
      if (action === "Add") {
        try {
          await addComment({
            comment: values.comment,
            postId,
            userData,
          });
          form.reset();
        } catch (error) {
          setErrorMessage("An unexpected error occurred. Please try again");
        }
      }
    }

    if (action === "Update" && commentId) {
      try {
        const res = await updateComment({
          comment: values.comment,
          postId,
          commentId,
          updatedAt: new Date(),
        });
        if (res) {
          router.push(`/post/${postId}`);
        }
      } catch (error) {
        setErrorMessage("An unexpected error occurred. Please try again");
      }
    }

    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form
        className="my-4 border rounded-lg p-4 flex flex-col space-y-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        <CustomFieldComment
          control={form.control}
          name="comment"
          formLabel={`${action} your comment`}
          className="flex flex-col grow col-span-5"
          render={({ field }) => (
            <Textarea
              {...field}
              className="textarea-field grow"
              placeholder="Comment..."
            />
          )}
        />

        <Button
          type="submit"
          className="submit-button capitalize"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : `${action} Comment`}
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
