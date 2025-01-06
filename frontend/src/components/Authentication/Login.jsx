import React from 'react'
import { useState } from "react";
import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { PasswordInput } from "../ui/password-input";
import { useForm } from 'react-hook-form';

const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();




  const onSubmit = handleSubmit((data) => {
    setName(data.firstName);
    setEmail(data.email);
    console.log(data);
  });

  return (
    <Box
      bg="white"
      w="100%"
      p="4"
      color="black"
      borderRadius="lg"
      borderWidth="1px"
      centerContent
    >
      <form onSubmit={onSubmit}>
        <Stack gap="4" align="flex-start" maxW="sm">
         

          <Field
            label="Email"
            invalid={!!errors.email}
            errorText={errors.email?.message}
          >
            <Input
              type="email"
              {...register("email", { required: "email is required" })}
            />
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

       


          <Button bg="blue.600" _hover={{ bg: "blue.700" }} className='child' width="100%" type="submit">Login</Button>
          <Button  className='child' width="100%" type="submit" bg="gray.900" _hover={{ bg: "black" }}
          onClick={()=>{
            setEmail("guest123@gmail.com");
            setPassword('Guest@123')
          }} > Get Guest User Credentials</Button>
        </Stack>
      </form>
    </Box>
  )
}

export {Login}