import { formSchemaRegistration } from "@/constants";
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

type CustomFieldRegistrationProps = {
  control: Control<z.infer<typeof formSchemaRegistration>> | undefined;
  render: (props: { field: any }) => React.ReactNode;
  name: keyof z.infer<typeof formSchemaRegistration>;
  formLabel?: string;
  className?: string;
};

export const CustomFieldRegistration = ({
  control,
  render,
  name,
  formLabel,
  className,
}: CustomFieldRegistrationProps) => {
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
