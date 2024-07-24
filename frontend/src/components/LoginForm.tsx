
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";

export enum FormFieldType {
  INPUT = "input",
  PASSWORD = "password",
}

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  password: z
    .string()
    .min(2, "Password must be at least 2 characters")
    .max(50, "Password must be at most 50 characters"),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof UserFormValidation>) {
    try {
      console.log(data); // Log the form data
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="John Doe"
        />

        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name="password"
          label="Password"
          placeholder="1234567"
        />

        <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
