
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  
    setUser(userInfo);
   
    if (!userInfo) {
      navigate("/");
    }
    else {
      navigate("/todos")
    }
  }, [navigate]);

  return (
    <TodoContext.Provider value={{ user, setUser }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  return useContext(TodoContext);
};

export default TodoProvider;
