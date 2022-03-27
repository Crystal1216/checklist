import { useEffect, useState } from "react";
import TodoForm from "../components/TodoForm";
import Todo from "../components/Todo";
import Local from "../components/Local";
import "../styles/Todo.css";

const TodoList = () => {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  useEffect(() => {
    Local.getLocalTodos({ todos, setTodos });
    Local.getLocalStudents({ studentList, setStudentList });
  }, []);
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(studentList));
  }, [studentList]);
  const statusHandler = ({ target }) => {
    setStatus(target.value);
  };
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  return (
    <div className="Todo">
      <h1>Todo List</h1>
      <div className="todo-register">
        <TodoForm
          inputText={inputText}
          setInputText={setInputText}
          todos={todos}
          setTodos={setTodos}
        />
      </div>
      <div className="todo-list">
        <div className="todo-select">
          <select onChange={statusHandler} name="todos" className="todo-filter">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
        <ul className="todo-ul">
          {filteredTodos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              todos={todos}
              setTodos={setTodos}
              studentList={studentList}
              setStudentList={setStudentList}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
