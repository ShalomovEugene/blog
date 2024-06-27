import { formSchemaComment } from "@/constants";
import React from "react";
import { Control } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type CustomFieldCommentProps = {
  control: Control<z.infer<typeof formSchemaComment>> | undefined;
  render: (props: { field: any }) => React.ReactNode;
  name: keyof z.infer<typeof formSchemaComment>;
  formLabel?: string;
  className?: string;
};

export const CustomFieldComment = ({
  control,
  render,
  name,
  formLabel,
  className,
}: CustomFieldCommentProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {formLabel && <FormLabel className="text-sm">{formLabel}</FormLabel>}
          <FormControl>{render({ field })}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
