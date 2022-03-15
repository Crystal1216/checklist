import { Link } from "react-router-dom";

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
    <div className="std-div">
      <li>
        {num}. {name}
      </li>
      <Link to={`/submit/${num}`} state={{ num }}>
        <button className="std-go-btn">
          <i className="fas fa-arrow-right"></i>
        </button>
      </Link>
      <button className="std-update-btn" onClick={updateHandler}>
        <i className="fas fa-pen"></i>
      </button>
      <button className="std-trash-btn" onClick={deleteHandler}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Student;
