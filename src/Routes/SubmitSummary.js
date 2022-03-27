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
      <div className="summary-list">
        <ul className="summary-ul">
          {studentList
            .sort((a, b) => {
              return a.num - b.num;
            })
            .map((student) => (
              <li key={student.id}>
                <div>
                  {student.id}. {student.name} :{" "}
                  {student.unSubmitted.join(", ")}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SubmitSummary;
