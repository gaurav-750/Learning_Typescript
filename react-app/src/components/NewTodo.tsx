import React, { useRef } from "react";
import "./NewTodo.css";

type NewTodoProps = {
  onAddTodo: (text: string) => void;
};

const NewTodo: React.FC<NewTodoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredTodo = textInputRef.current!.value;
    props.onAddTodo(enteredTodo);

    //clear the input field
    textInputRef.current!.value = "";
  };

  return (
    <div>
      <form onSubmit={todoSubmitHandler}>
        <div className="form-control">
          <label htmlFor="todo-text">Todo Text</label>
          <input type="text" id="todo-text" ref={textInputRef} />
        </div>

        <button type="submit">ADD TODO</button>
      </form>
    </div>
  );
};

export default NewTodo;
