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
  const [save, setSave] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const checkedItems = new Set();

  useEffect(() => {
    Local.getLocalTodos({ todos, setTodos });
    Local.getLocalStudents({ studentList, setStudentList });
  }, []);
  useEffect(() => {
    if (save) {
      localStorage.setItem("todos", JSON.stringify(todos));
      setSave(false);
    }
  }, [save, todos]);
  useEffect(() => {
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
    setSave(true);
    window.alert("success");
  };
  const checkedItemHandler = (id, isChecked) => {
    if (checkedItems.size === 0) {
      todos
        .find((el) => el.id === todo.id)
        .checked.map((el) => checkedItems.add(el));
    }
    if (isChecked && !checkedItems.has(id)) {
      checkedItems.add(id);
    }
    if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
    }
  };
  const allCheckHandler = (event) => {
    event.preventDefault();
    if (isAll) {
      checkedItems.clear();
      setIsAll(false);
    } else {
      studentList.map((el) => checkedItems.add(el.id));
      setIsAll(true);
    }
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
  return (
    <div className="Check">
      <h1>{todo.text}</h1>
      <h3>(DeadLine : {todo.deadline})</h3>
      <br />
      <form className="check-form">
        <div>
          <button className="check-all-btn" onClick={allCheckHandler}>
            ALL
          </button>
          <button
            className="check-save-btn"
            type="submit"
            onClick={saveChecksHandler}
          >
            SAVE
          </button>
        </div>
        <div className="check-ul-div">
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
        </div>
      </form>
    </div>
  );
};

export default CheckList;
