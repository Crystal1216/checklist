import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/SubmitList.css";
import Local from "./Local";

const SubmitList = () => {
  const location = useLocation();
  const state = location.state;
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    Local.getLocalTodos({ todos, setTodos });
  }, []);
  return (
    <div className="submit">
      <header>
        {state.num}. {state.name}
      </header>
      <div className="split left">
        <h1>OK</h1>
        <ul>
          {todos
            .filter((el) => el.checked.includes(state.num))
            .map((filteredEl) => (
              <li key={filteredEl.id}>{filteredEl.text}</li>
            ))}
        </ul>
      </div>
      <div className="split right">
        <h1>NG</h1>
        <ul>
          {todos
            .filter((el) => !el.checked.includes(state.num))
            .map((filteredEl) => (
              <li key={filteredEl.id}>{filteredEl.text}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SubmitList;
