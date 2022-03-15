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
  // const getLocalStudents = () => {
  //   if (localStorage.getItem("students") === null) {
  //     localStorage.setItem("students", JSON.stringify([]));
  //   } else {
  //     let studentsLocal = JSON.parse(
  //       localStorage.getItem("students", JSON.stringify(studentList))
  //     );
  //     setStudentList(studentsLocal);
  //   }
  // };
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
      <header>Students List</header>
      <form className="std-form">
        <label className="std-label">No.</label>
        <input
          type="number"
          className="std-input-num"
          value={num}
          onChange={numHandler}
        />
        <label className="std-label">Name</label>
        <input type="text" value={name} onChange={nameHandler} />
        <button type="submit" onClick={listAddHandler}>
          <i className="fas fa-check"></i>
        </button>
      </form>
      <div className="std-container">
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
