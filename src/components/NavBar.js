import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <header id="container">
      <nav>
        <div id="logo">
          <Link className="nav-link" to="/checklist">
            Submit CheckList
          </Link>
        </div>
        <ul>
          <Link className="nav-link" to="/checklist/schedule">
            <li>Calendar</li>
          </Link>
          <Link className="nav-link" to="/checklist/todoList">
            <li>ToDo</li>
          </Link>
          <Link className="nav-link" to="/checklist/students">
            <li>Students</li>
          </Link>
          <Link className="nav-link" to="/checklist/submit/summary">
            <li>Summary</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
