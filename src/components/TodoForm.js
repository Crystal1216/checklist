import { useState } from "react";
import "../styles/Todo.css";

const TodoForm = ({ inputText, setInputText, todos, setTodos, setStatus }) => {
  const [inputDate, setInputDate] = useState("");
  const inputTextHandler = (event) => {
    setInputText(event.target.value);
  };
  const submitTodoHandler = (event) => {
    event.preventDefault();
    if (inputDate !== "" && inputText !== "") {
      setTodos([
        ...todos,
        {
          text: inputText,
          deadline: inputDate,
          completed: false,
          id: Math.random() * 1000,
          checked: [],
        },
      ]);
      setInputText("");
    }
  };
  const inputDateHandler = (event) => {
    setInputDate(event.target.value);
  };
  return (
    <form className="todo-form">
      <input
        value={inputDate}
        onChange={inputDateHandler}
        type="date"
        className={`todo-input date ${inputDate !== "" ? "ok" : ""}`}
      />
      <input
        value={inputText}
        onChange={inputTextHandler}
        type="text"
        className="todo-input text"
        placeholder="TODO"
      />
      <button onClick={submitTodoHandler} className="todo-button" type="submit">
        {/* <i className="fas fa-plus-square"></i> */}
        add
      </button>
    </form>
  );
};

export default TodoForm;
