import React from "react";
import { Todo } from "../models/todo.model";

import "./TodoList.css";

interface TodoListProps {
  items: Todo[];
  onDeleteTodo: (id: string) => void;
}

//* to tell typescript what props this func component is expecting
const TodoList: React.FC<TodoListProps> = ({ items, onDeleteTodo }) => {
  return (
    <>
      <ul>
        {items.map((todo) => {
          return (
            <li key={todo.id}>
              <span>{todo.title}</span>
              <button onClick={onDeleteTodo.bind(null, todo.id)}>DELETE</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TodoList;
