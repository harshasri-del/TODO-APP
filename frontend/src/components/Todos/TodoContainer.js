import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  Flex,
  Spacer,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import EditTodo from "./EditTodo";

const statusColors = {
  pending: "red.500",
  InProgress: "orange.300",
  completed: "green.500",
};

const TodoContainer = ({ todos, onEdit, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTodo, setSelectedTodo] = React.useState(null);

  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleUpdate = (todo) => {
    setSelectedTodo(todo);
    onOpen();
  };

  return (
    <>
      <Box
        maxH="650"
        overflowY="auto"
        p={4}
        border="1px solid"
        borderColor="gray.200"
      >
        <Stack spacing={4} direction="row" wrap="wrap">
          {todos.map((todo) => (
          
              <Card
                key={todo._id}
                variant="outline"
                borderRadius="md"
                height="auto"
                width="222px"
                overflow="hidden"
                p={4}
              >
                <CardBody>
                  <Heading size="md">{todo.title}</Heading>
                  <Text mt={2}>{todo.description}</Text>
                  <Text
                    mt={2}
                    fontWeight="bold"
                    color={statusColors[todo.status] || "gray.500"}
                  >
                    {todo.status}
                  </Text>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Flex width="100%" align="center">
                    <Spacer />
                    <Button
                      leftIcon={<EditIcon />}
                      colorScheme="blue"
                      onClick={() => handleUpdate(todo)}
                    >
                      Edit
                    </Button>
                    <Button
                      leftIcon={<DeleteIcon />}
                      colorScheme="red"
                      ml={3}
                      onClick={() => handleDelete(todo._id)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </CardFooter>
              </Card>
           
          ))}
        </Stack>
      </Box>
      {selectedTodo && (
        <EditTodo
          isOpen={isOpen}
          onClose={onClose}
          todo={selectedTodo}
          onUpdate={(updatedTodo) => {
            onEdit(selectedTodo._id, updatedTodo);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default TodoContainer;
