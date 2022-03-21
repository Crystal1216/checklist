import { Link } from "react-router-dom";
import "../styles/App.css";

function App() {
  return (
    <div className="App">
      <div>
        <ul className="home-ul">
          <Link className="home-link" to="/checklist">
            <li>Calendar</li>
          </Link>
          <Link className="home-link dropdown" to="/checklist/todoList">
            <li>Todo</li>
          </Link>
          <Link className="home-link" to="/checklist/students">
            <li>Students</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default App;
