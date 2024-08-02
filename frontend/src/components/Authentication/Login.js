import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!username || !password) {
      toast({
        title: "Please Fill All the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/login",
        { username, password },
        config
      );
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/todos");
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: error.response?.data?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px" color="black">
      <FormControl isRequired>
        <FormLabel>User Name</FormLabel>
        <Input
          value={username}
          type="text"
          placeholder="Enter Your Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></Input>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            value={password}
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></Input>
          <InputRightElement w="4rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        mt="15px"
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
     
    </VStack>
  );
};

export default Login;
