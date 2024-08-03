import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Heading,
  Button,
  useToast,
  Stack,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import TodoContainer from "../components/Todos/TodoContainer";
import axios from "axios";
import { useTodo } from "../components/context/TodoContext";
import { useNavigate } from "react-router-dom";

const TodosPage = () => {
  const { user } = useTodo();
  const toast = useToast();
  const [todos, setTodos] = useState([]);
  const [addTodo, setAddTodo] = useState("");
  const navigate= useNavigate()

  const onClickLogout = () => {
    localStorage.removeItem("userInfo")
    navigate("/")
  }

  const handleEdit = async (id, updatedData) => {
    try {
      const token = user;

      if (!token) {
        throw new Error("No token found");
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(`/api/todos/${id}`, updatedData, config);
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, ...updatedData } : todo
        )
      );

      toast({
        title: "Todo Updated",
        description: "The to-do item has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error Updating Todo",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = user;

      if (!token) {
        throw new Error("No token found");
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`/api/todos/${id}`, config);

      setTodos(todos.filter((todo) => todo._id !== id));

      toast({
        title: "To-Do Deleted",
        description: "The to-do item has been deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error Deleting To-Do",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const fetchTodos = async () => {
    try {
     
     console.log(user)
      const token = user;
      console.log(token)
      if (!token) {
        throw new Error("No token found");
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      };

      const response = await axios.get("/api/todos", config);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      toast({
        title: "Error Fetching Todos",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

    const handleAddTodo = async () => {
      try {
        const token = user;

        if (!token) {
          throw new Error("No token found");
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.post(
          "/api/todos",
          { description: addTodo },
          config
        );
        setTodos([...todos, response.data]);
        setAddTodo(""); 
        fetchTodos()

        toast({
          title: "Todo Added Successfully!!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } catch (error) {
        toast({
          title: "Error Adding Todo",
          description: error.response?.data?.message || error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    };





  return (
    <Container maxW="container.lg" py={4}>
      <Box mb={4}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          <Heading mb={4} m="auto">
            To-Do List
          </Heading>
          <Button colorScheme="purple" onClick={onClickLogout}>
            Logout
          </Button>
        </Box>

        <Stack direction="row" spacing={4} mb={4} align="center">
          <InputGroup flex="1">
            <Input
              placeholder="Add todos..."
              value={addTodo}
              onChange={(e) => setAddTodo(e.target.value)}
            />
          </InputGroup>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            onClick={handleAddTodo}
          >
            Add Todo
          </Button>
        </Stack>
        
        {todos.length === 0 ? (
          <Text fontSize="2xl" textAlign="center" color="gray.600">
            Welcome! You have no todos yet.
          </Text>
        ) : (
          <Stack spacing={4} wrap="wrap">
              <TodoContainer
                
              todos={todos}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Stack>
        )}
      </Box>
    </Container>
  );
};

export default TodosPage;
