import { Link } from "react-router-dom";
import "../styles/Students.css";

const Student = ({
  num,
  setNum,
  name,
  setName,
  studentList,
  setStudentList,
}) => {
  const updateHandler = () => {
    setNum(num);
    setName(name);
  };
  const deleteHandler = () => {
    setStudentList(studentList.filter((el) => el.id !== num));
  };
  return (
    <li className="std-li">
      <p className="std-num">{num}</p>
      <div className="std-li-box">
        <div className="std-name-div">
          <p>{name}</p>
        </div>
        <div className="std-btn-box">
          <button className="std-trash-btn" onClick={deleteHandler}>
            <i className="fas fa-trash"></i>
          </button>
          <button className="std-update-btn" onClick={updateHandler}>
            <i className="fas fa-pen"></i>
          </button>
          <Link to={`/submit/${num}`} state={{ num, name }}>
            <button className="std-go-btn">
              <i className="fas fa-arrow-right"></i>
            </button>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default Student;
