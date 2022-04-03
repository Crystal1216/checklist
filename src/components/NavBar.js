import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <header id="container">
      <nav>
        <div id="logo">
          <Link className="nav-link" to="">
            Tools For Class
          </Link>
        </div>
        <ul>
          <Link className="nav-link" to="/schedule">
            <li>Schedule</li>
          </Link>
          <Link className="nav-link" to="/todoList">
            <li>ToDo</li>
          </Link>
          <Link className="nav-link" to="/students">
            <li>Students</li>
          </Link>
          <Link className="nav-link" to="/submit/summary">
            <li>Summary</li>
          </Link>
          <Link className="nav-link" to="/download">
            <li>Donwload</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
