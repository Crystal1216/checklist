import { useEffect, useState } from "react";
import "../styles/Students.css";
import Student from "./Student";
import Local from "./Local";

const Students = () => {
  const [num, setNum] = useState("");
  const [name, setName] = useState("");
  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    Local.getLocalStudents({ studentList, setStudentList });
  }, []);
  useEffect(() => {
    saveLocalStudents();
  }, [studentList]);
  const numHandler = (event) => {
    const number = event.target.value;
    if (number < 1) {
      return;
    }
    if (number.length > 2) {
      setNum(number.substr(0, 2));
    } else {
      setNum(event.target.value);
    }
  };
  const nameHandler = (event) => {
    setName(event.target.value);
  };
  const listAddHandler = (event) => {
    event.preventDefault();
    if (num !== "" && name !== "") {
      if (studentList.find((student) => student.id === num)) {
        setStudentList(
          studentList.map((student) => {
            if (student.id === num) {
              return {
                ...student,
                name: name,
              };
            }
            return student;
          })
        );
      } else {
        setStudentList([...studentList, { num: num, name: name, id: num }]);
      }
      setNum("");
      setName("");
    }
  };
  const saveLocalStudents = () => {
    localStorage.setItem("students", JSON.stringify(studentList));
  };

  return (
    <div className="Students">
      <h1>Students List</h1>
      <div className="std-register">
        <form className="std-form">
          <input
            type="number"
            className="std-input num"
            value={num}
            onChange={numHandler}
            placeholder="No."
            required
          />
          <input
            type="text"
            className="std-input name"
            value={name}
            onChange={nameHandler}
            placeholder="name"
            required
          />
          <button type="submit" onClick={listAddHandler}>
            {/* <i className="fas fa-check"></i> */}
            register
          </button>
        </form>
      </div>
      <div className="std-list">
        <ul className="std-ul">
          {studentList
            .sort((a, b) => {
              return a.num - b.num;
            })
            .map((student) => (
              <Student
                key={student.id}
                num={student.num}
                setNum={setNum}
                name={student.name}
                setName={setName}
                studentList={studentList}
                setStudentList={setStudentList}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Students;
