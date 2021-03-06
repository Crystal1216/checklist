import { useEffect, useState } from "react";
import "../styles/Students.css";
import Student from "../components/Student";
import Local from "../components/Local";
import ModalUpload from "../components/ModalUpload";

const StudentsList = () => {
  const [num, setNum] = useState("");
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    Local.getLocalStudents({ studentList, setStudentList });
  }, []);
  useEffect(() => {
    saveLocalStudents();
  }, [studentList]);

  const numHandler = (event) => {
    const number = event.target.value;
    if (number.length > 2) {
      setNum(Number(number.substr(0, 2)));
    } else {
      if (number < 1) {
        setNum("");
      } else {
        setNum(Number(event.target.value));
      }
    }
  };
  const groupHandler = (event) => {
    const group = event.target.value;
    console.log(typeof group);
    if (group.length > 2) {
      setGroup(Number(group.substr(0, 2)));
    } else {
      if (group < 1) {
        setGroup("");
      } else {
        setGroup(Number(event.target.value));
      }
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
                group: group,
                name: name,
              };
            }
            return student;
          })
        );
      } else {
        setStudentList([
          ...studentList,
          { num: num, name: name, group: group, id: num, unSubmitted: [] },
        ]);
      }
      setNum("");
      setGroup("");
      setName("");
    }
  };
  const saveLocalStudents = () => {
    localStorage.setItem("students", JSON.stringify(studentList));
  };

  return (
    <div className="Students">
      <h1>Students List</h1>
      <div className="std-upload-div">
        <button
          className="modal-btn"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Upload NameList
        </button>
        {openModal && (
          <ModalUpload
            setOpenModal={setOpenModal}
            setStudentList={setStudentList}
          />
        )}
      </div>
      <div className="std-register">
        <form className="std-form">
          {/* <div>
            <input
              type="number"
              className="std-input grd"
              placeholder="grade"
              required
            />
            <input
              type="number"
              className="std-input cls"
              placeholder="class"
              required
            />
          </div> */}
          <div>
            <input
              type="number"
              className="std-input num"
              value={num}
              onChange={numHandler}
              placeholder="No."
              required
            />
            {/* <input
              type="number"
              className="std-input group"
              value={group}
              onChange={groupHandler}
              placeholder="Group"
              required
            /> */}
            <input
              type="text"
              className="std-input name"
              value={name}
              onChange={nameHandler}
              placeholder="Name"
              required
            />
          </div>
          <button type="submit" onClick={listAddHandler}>
            {/* <i className="fas fa-check"></i> */}
            register
          </button>
        </form>
      </div>
      <div className="std-list">
        <ul className="std-ul">
          {studentList &&
            studentList
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
                  group={student.group}
                  setGroup={setGroup}
                  studentList={studentList}
                  setStudentList={setStudentList}
                />
              ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentsList;
