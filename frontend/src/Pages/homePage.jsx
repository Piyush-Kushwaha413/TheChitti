import React from "react";
import { FaUserAlt, FaFolderMinus } from "react-icons/fa";
import { Login, Singup } from "../components/utility/import";
import { Container, Box, Text, Tabs } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <div className="margin">
      <Container maxW="xl" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg="white"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text fontSize="4xl" textAlign="center" fontWeight="semibold"  fontFamily="Work sans">
            Haan-Jii-Bole
          </Text>
        </Box>

        <Tabs.Root defaultValue="login" variant="plain" 
           >
          <Tabs.List bg="bg.muted" rounded="l3" p="1" className="justify-center" >
            <Tabs.Trigger value="login">
              <FaUserAlt />
              Login
            </Tabs.Trigger>
            <Tabs.Trigger value="singup">
              <FaFolderMinus />
              Singup
            </Tabs.Trigger>
            <Tabs.Indicator rounded="l2" />
          </Tabs.List>
          <Tabs.Content value="login"> <Login/> </Tabs.Content>
          <Tabs.Content value="singup"> <Singup/> </Tabs.Content>
        </Tabs.Root>
      </Container>
    </div>
  );
};

export { HomePage };


