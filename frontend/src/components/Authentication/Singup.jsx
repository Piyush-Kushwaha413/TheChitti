import React, { useState } from "react";
import { Button, Input, Stack } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { PasswordInput } from "../ui/password-input";
import { useForm } from "react-hook-form";

const Singup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // onSubmit do this
  const onSubmit = handleSubmit((data) => {

    setName(data.firstName);
    setEmail(data.email);
    console.log(data);
   
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field
          label="First name"
          invalid={!!errors.firstName}
          errorText={errors.firstName?.message}
        >
          <Input
            {...register("firstName", { required: "First name is required" })}
          />
        </Field>

        <Field
          label="email"
          invalid={!!errors.email}
          errorText={errors.email?.message}
        >
          <Input {...register("email", { required: "email is required" })} />
        </Field>

        <Field
          label="Password"
          invalid={!!errors.password}
          errorText={errors.password?.message}
        >
          <PasswordInput
            placeholder="Set your Password "
            {...register("password", { required: "password is required" })}
          />
        </Field>

        <Field
          label="Comfirm Password"
          invalid={!!errors.confirmPassword}
          errorText={errors.confirmPassword?.message}
        >
          <PasswordInput
            placeholder="Confirm Your Password "
            {...register("confirmPassword", { required: "password is required" })}
          />
        </Field>

        <Field
          label="ProfileImg"
          invalid={!!errors.pic}
          errorText={errors.pic?.message}
        >
          <Input
          type="file"
          accept="image"
           {...register("pic", { required: "ProfileImg is required" })} />
        </Field>

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
};

export { Singup };
