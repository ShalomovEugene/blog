"use client";
import { register } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  defaultValuesFormRegistration,
  formSchemaRegistration,
} from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { CustomFieldRegistration } from "./CustomFieldRegistration";

const RegistrationForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const initialValues = defaultValuesFormRegistration;
  const form = useForm<z.infer<typeof formSchemaRegistration>>({
    resolver: zodResolver(formSchemaRegistration),
    defaultValues: initialValues,
  });
  async function onSubmit(values: z.infer<typeof formSchemaRegistration>) {
    const formData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };

    try {
      const registation = await register({
        formData,
      });
      if (registation) {
        form.reset();
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An unexpected error occurred. Please try again");
    }
  }

  return (
    <Form {...form}>
      <form
        className="my-4 border rounded-lg p-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {errorMessage && (
          <p className="text-center text-red-600">{errorMessage}</p>
        )}
        <h2 className="text-neutral-600 text-center mb-2">
          Please provide all the necessary information
        </h2>
        <div className="flex flex-col space-y-2">
          <CustomFieldRegistration
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="First Name"
                className="input-field"
                control={form.control}
                type="text"
              />
            )}
          />

          <CustomFieldRegistration
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Last Name"
                className="input-field"
                control={form.control}
                type="text"
              />
            )}
          />

          <CustomFieldRegistration
            control={form.control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="email@example.com"
                className="input-field"
                control={form.control}
                type="email"
              />
            )}
          />

          <CustomFieldRegistration
            control={form.control}
            name="password"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="*************"
                className="input-field"
                control={form.control}
                type="password"
              />
            )}
          />

          <Button>Sign up &rarr;</Button>
        </div>
      </form>
    </Form>
  );
};

export default RegistrationForm;
