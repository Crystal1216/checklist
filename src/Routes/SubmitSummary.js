import { useEffect, useState } from "react";
import Local from "../components/Local";
import "../styles/SubmitSummary.css";

const SubmitSummary = () => {
  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    Local.getLocalStudents({ studentList, setStudentList });
  }, []);
  return (
    <div className="SubmitSummary">
      <h1>Unsubmitted List</h1>
      <div>
        <ul>
          {studentList
            .sort((a, b) => {
              return a.num - b.num;
            })
            .map((student) => (
              <li key={student.id}>
                {student.id}. {student.name} :{" "}
                {student.unSubmitted.length === 0
                  ? ""
                  : student.unSubmitted.join(", ")}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SubmitSummary;
