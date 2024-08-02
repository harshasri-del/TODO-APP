import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import TodosPage from "./pages/TodosPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/todos" element={<TodosPage />} />
      </Routes>
      
    </div>
  );
}

export default App;
