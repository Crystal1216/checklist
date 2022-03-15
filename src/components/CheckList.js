import { useEffect, useState } from "react";
import "../styles/CheckList.css";
import { useLocation } from "react-router-dom";
import Local from "./Local";
import Check from "./Check";

const CheckList = () => {
  const location = useLocation();
  const todo = location.state.todo;
  const [todos, setTodos] = useState([...location.state.todos]);
  const [studentList, setStudentList] = useState([]);
  const [checkedItems, setCheckedItems] = useState(new Set());
  useEffect(() => {
    Local.getLocalStudents({ studentList, setStudentList });
  }, []);
  // useEffect(() => {
  //   getLocalChecked();
  // }, []);
  useEffect(() => {
    setCheckedItems(new Set(todo.checked));
  }, []);
  useEffect(() => {
    saveLocalChecked();
  }, [todos]);
  const saveChecksHandler = (event) => {
    event.preventDefault();
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            checked: [...checkedItems],
          };
        }
        return item;
      })
    );
  };
  const checkedItemHandler = (id, isChecked) => {
    console.log(checkedItems);
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
  };
  const saveLocalChecked = () => {
    localStorage.removeItem("todos");
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  // const getLocalChecked = () => {
  //   if (localStorage.getItem("todos") === null) {
  //     localStorage.setItem("todos", JSON.stringify([]));
  //   } else {
  //     let todoLocal = JSON.parse(
  //       localStorage.getItem("todos", JSON.stringify(todos))
  //     );
  //     setTodos(todoLocal);
  //   }
  // };
  return (
    <div className="Check">
      <header>
        {todo.text} {todo.checked}
      </header>
      <form className="check-form">
        <button type="submit" onClick={saveChecksHandler}>
          SAVE
        </button>
        <ul className="check-ul">
          {studentList.map((student) => (
            <Check
              student={student}
              checkedNum={todo.checked}
              key={student.id}
              checkedItemHandler={checkedItemHandler}
            />
          ))}
        </ul>
      </form>
    </div>
  );
};

export default CheckList;
