"use client";
import { login } from "@/actions/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { defaultValuesLoginFrom, formSchemaLogin } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CustomFieldLogin } from "./CustomFieldLogin";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const initialValues = defaultValuesLoginFrom;
  const form = useForm<z.infer<typeof formSchemaLogin>>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof formSchemaLogin>) {
    const formData = {
      email: values.email,
      password: values.password,
    };

    try {
      const loggedIn = await login({
        formData,
      });
      if (loggedIn) {
        form.reset();
        router.push(`/`);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again");
    }
  }

  return (
    <Form {...form}>
      <form
        className="my-4 border rounded-lg p-4 flex flex-col space-y-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        <CustomFieldLogin
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

        <CustomFieldLogin
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

        <Button type="submit">Login &rarr;</Button>

        <p className="pt-2 text-center">
          Don&apos;t have account?{" "}
          <Link href="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
