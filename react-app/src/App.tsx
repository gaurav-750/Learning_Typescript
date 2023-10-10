import React from "react";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";

const App: React.FC = () => {
  const todos = [
    { id: 1, title: "Finish the course" },
    { id: 2, title: "Take out the trash" },
  ];

  const todoAddHandler = (text: string) => {
    console.log("App todoAddHandler:", text);
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} />
    </div>
  );
};

export default App;
