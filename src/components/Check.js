import { useEffect, useState } from "react";
import "../styles/CheckList.css";

const Check = ({ student, checkedItemHandler, checkedNum }) => {
  const [bChecked, setChecked] = useState(false);
  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    checkedItemHandler(target.id, target.checked);
  };
  useEffect(() => {
    setChecked(checkedNum.includes(student.id) ? true : false);
  }, []);
  return (
    <li key={student.id}>
      <input
        id={student.id}
        type="checkbox"
        checked={bChecked}
        onChange={(e) => checkHandler(e)}
      />
      <label htmlFor={student.id} className="checkbox01">
        {student.id}.{student.name}
      </label>
    </li>
  );
};

export default Check;
