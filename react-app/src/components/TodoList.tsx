import React from "react";

interface Todo {
  id: number;
  title: string;
}

interface TodoListProps {
  items: Todo[];
}

//* to tell typescript what props this func component is expecting
const TodoList: React.FC<TodoListProps> = ({ items }) => {
  return (
    <>
      <ul>
        {items.map((todo) => {
          return <li key={todo.id}>{todo.title}</li>;
        })}
      </ul>
    </>
  );
};

export default TodoList;
