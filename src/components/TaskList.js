import React from "react";

const TodosList = ({ todos, setTodos, setEditTodo }) => {
  // Function to handle task completion
  // It toggles the 'completed' status of a todo item
  const handleComplete = (todo) => {
    setTodos(
      todos.map((item) => {
        // If the current item's id matches the id of the todo being completed,
        // toggle its 'completed' status
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed };
        }
        // Otherwise, return the item as is
        return item;
      })
    );
  };

  // Function to handle task deletion
  // It removes a todo item from the list based on its id
  const handleDelete = (id) => {
    // Filter out the todo with the given id from the todos list
    const newTodos = todos.filter((todo) => todo.id !== id);
    // Update the state with the new todos list
    setTodos(newTodos);
  };

  // Function to handle task edit
  // It sets the todo item to be edited
  const handleEdit = (todo) => {
    // Find the todo item in the list by its id
    const findTodo = todos.find((item) => item.id === todo.id);
    // Set the found todo item as the one to be edited
    setEditTodo(findTodo);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li className="list-item" key={todo.id}>
          {/* Display the todo's title in an input field */}
          <input
            type="text"
            value={todo.title}
            className={`list ${todo.completed ? "list-complete" : ""}`}
            // Prevent the input field from being edited directly
            onChange={(event) => event.preventDefault()}
          />
          {/* Button to toggle the 'completed' status of the todo */}
          <button className="button-complete task-button" onClick={() => handleComplete(todo)}>
            <i className="fa fa-check-circle"></i>
          </button>
          {/* Button to set the todo item for editing */}
          <button className="button-edit task-button" onClick={() => handleEdit(todo)}>
            <i className="fa fa-edit"></i>
          </button>
          {/* Button to delete the todo item */}
          <button className="button-delete task-button" onClick={() => handleDelete(todo.id)}>
            <i className="fa fa-trash"></i>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodosList;
