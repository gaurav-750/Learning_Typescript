import React, { useState } from "react";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { Todo } from "./models/todo.model";

const App: React.FC = () => {
  //state
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (text: string) => {
    console.log("App todoAddHandler:", text);

    //add the new todo to the todos array
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Math.random().toString(),
        title: text,
      },
    ]);
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} />
    </div>
  );
};

export default App;
