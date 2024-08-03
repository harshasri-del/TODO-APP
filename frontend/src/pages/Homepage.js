import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import { useNavigate } from "react-router-dom";
import Signup from "../components/Authentication/SignUp";
import { useTodo } from "../components/context/TodoContext";

const Homepage = () => {
  const navigate = useNavigate();
  const {user} = useTodo()

  if (user) {
    navigate("/todos");
  }

  return (
    <Container
      maxW="xl"
      centerContent
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      p={3}
      minH="100vh"
    >
      <Box
        backgroundColor={"lightgray"}
        w="100%"
        p={5}
        m="50px 0 14px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          bg={"white"}
          textAlign={"center"}
          backgroundColor={"lightpink"}
          m="10px 0 10px 0"
        >
          <Text fontSize={"2xl"} fontFamily={"Work sans"} color={"black"}>
            TODO APP
          </Text>
        </Box>
        <Box
          maxW="xl"
          w="100%"
          borderRadius="lg"
          bg="white"
          p="3"
          m="40px 0 a5px 0"
          borderWidth="1px"
          color="black"
        >
          <Tabs variant="soft-rounded">
            <TabList mb="1em">
              <Tab w="50%">Login</Tab>
              <Tab w="50%">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Container>
  );
};

export default Homepage;
