import React from 'react'
import { useState } from "react";
import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { PasswordInput } from "../ui/password-input";
import { useForm } from 'react-hook-form';
import{instance} from '../utility/import'
import { useNavigate } from "react-router";
import axios from 'axios';

const Login = () => {
  
 const naviagate =   useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState( false)



  const onSubmit = async (userdata) => {
    setLoading(true)
    
    if (userdata) {
      try {

      console.log( loading ,  "line no. 32 ");
        const config = {
          headers:{
            "content-type":"application/json",
          }}
        let {data} = await instance.post("/api/user/login",userdata,config);
        console.log(loading, data , "line 35");
        localStorage.setItem("userInfo",JSON.stringify(data));
        setLoading(false);
        naviagate("/chat");
        
        
    } catch (error) {
      console.log( "line no. 43 ");
      throw new Error("failed to login", error)
      setLoading(false);

    }

    } else{
      throw new Error("don't have data");
      console.log("don't have data");
      setLoading(false);
    }
     console.log(loading , "line 51");
  };

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
      <form onSubmit={ handleSubmit(onSubmit)}>
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