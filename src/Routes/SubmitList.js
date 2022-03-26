import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/SubmitList.css";
import Local from "../components/Local";

const SubmitList = () => {
  const location = useLocation();
  const state = location.state;
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    Local.getLocalTodos({ todos, setTodos });
  }, []);
  return (
    <div className="Submit">
      <h1>{state.name}</h1>
      <div>
        <ul>
          <li className="split">
            <h3 className="split-text left">OK</h3>
            <ul>
              {todos
                .filter((el) => el.checked.includes(state.num))
                .map((filteredEl) => (
                  <li key={filteredEl.id}>{filteredEl.text}</li>
                ))}
            </ul>
          </li>
          <li className="split">
            <h3 className="split-text right">NG</h3>
            <ul>
              {todos
                .filter((el) => !el.checked.includes(state.num))
                .map((filteredEl) => (
                  <li key={filteredEl.id}>{filteredEl.text}</li>
                ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SubmitList;
