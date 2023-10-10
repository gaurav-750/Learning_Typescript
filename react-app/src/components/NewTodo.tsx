import React, { useRef } from "react";

type NewTodoProps = {
  onAddTodo: (text: string) => void;
};

const NewTodo: React.FC<NewTodoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredTodo = textInputRef.current!.value;
    props.onAddTodo(enteredTodo);
  };

  return (
    <div>
      <form onSubmit={todoSubmitHandler}>
        <div>
          <label htmlFor="todo-text">Todo Text</label>
          <input type="text" id="todo-text" ref={textInputRef} />
        </div>

        <button type="submit">ADD TODO</button>
      </form>
    </div>
  );
};

export default NewTodo;
