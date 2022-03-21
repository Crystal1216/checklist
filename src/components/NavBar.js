import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <div id="container">
      <nav>
        <div id="logo">
          <Link className="nav-link" to="/checklist">
            Submit CheckList
          </Link>
        </div>
        <ul>
          <Link className="nav-link" to="/checklist/calendar">
            <li>Calendar</li>
          </Link>
          <Link className="nav-link" to="/checklist/todoList">
            <li>ToDo</li>
          </Link>
          <Link className="nav-link" to="/checklist/students">
            <li>Students</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
