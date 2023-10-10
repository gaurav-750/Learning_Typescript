import React from "react";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  const todos = [
    { id: 1, title: "Finish the course" },
    { id: 2, title: "Take out the trash" },
  ];

  return (
    <div className="App">
      <TodoList items={todos} />
    </div>
  );
};

export default App;
