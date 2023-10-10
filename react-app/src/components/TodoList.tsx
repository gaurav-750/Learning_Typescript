import React from "react";
import { Todo } from "../models/todo.model";

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
