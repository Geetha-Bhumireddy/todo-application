import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

// The Form component handles the input for creating and updating todos
const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
  // Function to update an existing todo
  const updateTodo = (title, id, completed) => {
    // Map through the todos and update the todo that matches the given id
    const newTodos = todos.map((todo) =>
      todo.id === id ? { title, id, completed } : todo
    );
    // Set the updated todos array in the state
    setTodos(newTodos);
    // Clear the editTodo state
    setEditTodo("");
  };

  // useEffect hook to set the input value when editTodo changes
  useEffect(() => {
    // If there is an editTodo, set the input value to the title of the editTodo
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      // Otherwise, clear the input value
      setInput("");
    }
  }, [setInput, editTodo]);

  // Function to handle input changes
  const onInputChange = (event) => {
    // Update the input state with the new value from the input field
    setInput(event.target.value);
  };

  // Function to handle form submission
  const onFormSubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // If there is no editTodo, create a new todo
    if (!editTodo) {
      setTodos([...todos, { id: uuidv4(), title: input, completed: false }]);
      // Clear the input field
      setInput("");
    } else {
      // Otherwise, update the existing todo
      updateTodo(input, editTodo.id, editTodo.completed);
    }
  };

  return (
    // Form element with an onSubmit handler
    <form onSubmit={onFormSubmit}>
      {/* Input field for entering the todo title */}
      <input
        type="text"
        placeholder="Enter a Todo..."
        className="task-input"
        value={input}
        required
        onChange={onInputChange}
      />
      {/* Button to submit the form */}
      <button className="button-add" type="submit">
        {editTodo ? "OK" : "Add"}
      </button>
    </form>
  );
};

export default Form;
