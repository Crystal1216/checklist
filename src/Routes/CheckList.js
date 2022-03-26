import { useEffect, useState } from "react";
import "../styles/CheckList.css";
import { useLocation } from "react-router-dom";
import Local from "../components/Local";
import Check from "../components/Check";

const CheckList = () => {
  const location = useLocation();
  const todo = location.state.todo;
  const [todos, setTodos] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [checkedItems, setCheckedItems] = useState(new Set());

  useEffect(() => {
    Local.getLocalTodos({ todos, setTodos });
    Local.getLocalStudents({ studentList, setStudentList });
  }, []);
  useEffect(() => {
    localStorage.removeItem("todos");
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  useEffect(() => {
    localStorage.removeItem("students");
    localStorage.setItem("students", JSON.stringify(studentList));
  }, [studentList]);
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
    addSubmitList();
  };
  const addSubmitList = () => {
    setStudentList(
      studentList.map((student) => {
        if (![...checkedItems].includes(student.id)) {
          return {
            ...student,
            unSubmitted: student.unSubmitted.includes(todo.text)
              ? [...student.unSubmitted]
              : [...student.unSubmitted, todo.text],
          };
        }
        return {
          ...student,
          unSubmitted: student.unSubmitted.includes(todo.text)
            ? student.unSubmitted.filter((el) => el !== todo.text)
            : [...student.unSubmitted],
        };
      })
    );
  };
  const checkedItemHandler = (id, isChecked) => {
    todos
      .find((el) => el.id === todo.id)
      .checked.map((el) => checkedItems.add(el));
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
  };

  return (
    <div className="Check">
      <h1>{todo.text}</h1>
      <h3>(DeadLine : {todo.deadline})</h3>
      <br />
      <form className="check-form">
        <button type="submit" onClick={saveChecksHandler}>
          SAVE
        </button>
        <ul className="check-ul">
          {studentList.map((student) => (
            <Check
              student={student}
              checkedNum={todos.find((el) => el.id === todo.id).checked}
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
