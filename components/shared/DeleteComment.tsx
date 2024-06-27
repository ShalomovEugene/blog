"use client";

import { useTransition } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";
import { deleteCommmet } from "@/actions/post";
import { IconTrashX } from "@tabler/icons-react";

export const DeleteComment = ({
  commentId,
  postId,
}: {
  commentId: string;
  postId: string;
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="iconXs" type="button" variant="destructive">
          <IconTrashX size={"17"} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="flex flex-col gap-10">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this comment?
          </AlertDialogTitle>
          <AlertDialogDescription className="p-16-regular">
            This will permanently delete this comment
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="border bg-red-500 text-white hover:bg-red-600"
            onClick={() =>
              startTransition(async () => {
                await deleteCommmet(commentId, postId);
              })
            }
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
