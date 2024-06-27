import { formSchemaLogin } from "@/constants";
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

type CustomFieldLoginProps = {
  control: Control<z.infer<typeof formSchemaLogin>> | undefined;
  render: (props: { field: any }) => React.ReactNode;
  name: keyof z.infer<typeof formSchemaLogin>;
  formLabel?: string;
  className?: string;
};

export const CustomFieldLogin = ({
  control,
  render,
  name,
  formLabel,
  className,
}: CustomFieldLoginProps) => {
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
