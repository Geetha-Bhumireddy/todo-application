import React, { useState } from "react";
import Header from "./components/Header"; // Importing Header component
import Form from "./components/TaskInput"; // Importing Form component for task input
import TodosList from "./components/TaskList"; // Importing TodosList component for displaying tasks
import "./App.css"; // Importing CSS for styling

const App = () => {
  const [input, setInput] = useState(""); // State for input field
  const [todos, setTodos] = useState([]); // State for list of todos
  const [editTodo, setEditTodo] = useState(null); // State for editing a todo item

  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <Header /> {/* Rendering Header component */}
        </div>
        <div>
          <Form 
            input={input} 
            setInput={setInput} 
            todos={todos} 
            setTodos={setTodos} 
            editTodo={editTodo}
            setEditTodo={setEditTodo}
          /> {/* Rendering Form component with props */}
          <div>
            <TodosList 
              todos={todos} 
              setTodos={setTodos} 
              setEditTodo={setEditTodo} 
            /> {/* Rendering TodosList component with props */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
