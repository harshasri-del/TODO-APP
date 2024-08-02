
import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
} from "@chakra-ui/react";

const EditTodo = ({ isOpen, onClose, todo, onUpdate }) => {
  const [description, setDescription] = useState(todo.description || "");
  const [status, setStatus] = useState(todo.status || "");

  useEffect(() => {
    setDescription(todo.description || "");
    setStatus(todo.status || "");
  }, [todo]);

  const handleSave = () => {
    onUpdate({ description, status });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Edit Todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="description" mb={4}>
            <FormLabel>Description</FormLabel>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl id="status" mb={4}>
            <FormLabel>Status</FormLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="completed">Completed</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTodo;

