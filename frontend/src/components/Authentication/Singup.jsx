import React, { useState } from "react";
import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { PasswordInput } from "../ui/password-input";
import { set, useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useNavigate } from 'react-router';  // unistall react router dom

const Singup = () => {

  const nevigates = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState(" ");
  const [loading, setLoadig] = useState(false);
  const [picFile, setpicfile] = useState();



  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // onSubmit do this
  const onSubmit = async (data) => {
    setLoadig(true);
    console.log(data, "line no. 31 data log");

    if (data) {
       try {
      console.log(name,password,email, " line: 32");
    } catch (error) {
      console.log("error", error);
      return console.log("error not have data line no. 35"); 
    }
    } else {
      throw new Error("error not have data: formData")
      return console.log("error not have data line no. 41");
    }
   

    // process after clicking singup 
    try {
      // checking password are same or not 
      console.log("password checking ");
      if (data) {
        // match passwords is same or not
        if (data.password !== data.confirmPassword) {
          // do if password are same
          throw new Error("password not match line no. 48", errors);
          return;
        } else {
          // do if password are same
          // set pic on cloud || get a url
          try {
            if (data.pic[0]) {
              const formData = new FormData();
              const url =
                "https://api.cloudinary.com/v1_1/chatappenv/image/upload";
              formData.append("file", data.pic[0]);
              formData.append("upload_preset", "chatapp");
              formData.append("cloud_name", "chatappenv");

              try {
                await fetch(url, {
                  method: "POST",
                  body: formData,
                })
                  .then((response) => {
                    return response.json();
                  })
                  .then((picData) => {
                    setPic(picData.url);
                    console.log(picData.url);
                  });
              } catch (error) {
                console.log(error);
                setLoadig(false);
              }
            
            } else {
              return
              console.error("set a pic");
            }
          } catch (error) {
            console.log(error,"geting some error in uploading pic");
          }
        }
      }
    } catch (error) {
      throw new Error("password not match", errors);
    }


    //  if all ok then send data to backend
    try {

      if (name || email || password || pic) {
        console.log("if all ok then send data to backend");
        const config = {
          headers:{
            "content-type":"application/json",
          },
        };
  
        console.log(name,password,email, " line: 100");
        let {data} = await axios.post("http://localhost:8080/api/user",{name,email,password,pic},config);
        console.log(data, "line node. 103  ");
        localStorage.setItem("userInfo",JSON.stringify(data));
        setLoadig(false);
        nevigates("chat");
  
      } else {
        return  new Error("not have the required states") 
      }
     


    } catch (error) {
      console.log(error);
      throw new Error("fail to set data to backend", error)
    }
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="4" align="flex-start" maxW="sm">
          <Field
            onChange={(e)=>{ setName(e.target.value);}}
            label="First name"
            invalid={!!errors.name}
            errorText={errors.name?.message}
          >
            <Input
              {...register("name", { required: "First name is required" })}
            />
          </Field>

          <Field
            label="email"
            onChange={(e)=>{ setEmail(e.target.value);}}
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
            onChange={(e)=>{ setPassword(e.target.value);}}
            invalid={!!errors.password}
            errorText={errors.password?.message}
          >
            <PasswordInput
              placeholder="Set your Password "
              {...register("password", { required: "password is required" })}
            />
          </Field>

          <Field
            onChange={(e)=>{ setConfirmPassword(e.target.value);}}
            label="Comfirm Password"
            invalid={!!errors.confirmPassword}
            errorText={errors.confirmPassword?.message}
          >
            <PasswordInput
              placeholder="Confirm Your Password "
              {...register("confirmPassword", {
                required: "password is required",
              })}
            />
          </Field>

          <Field
          onChange={(e) => {
            setpicfile(e.target.files[0])
            console.log(e.target.files[0], "onchange line no. 180");
            console.log(picFile);
          }}
            label="Profile Image"
            invalid={!!errors.pic}
            errorText={errors.pic?.message}
          >
            <Input
              type="file"
              accept="image"
              
              {...register("pic", {  })}
            />
          </Field>

          <Button
            bg="blue.600"
            _hover={{ bg: "blue.700" }}
            className="child"
            width="100%"
            type="submit"
          >
            Singup
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export { Singup };
