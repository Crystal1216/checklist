import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <nav>
      <ul className="nav-ul">
        <li>
          <Link className="text-link" to="/checklist">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-link" to="/checklist/todoList">
            List
          </Link>
        </li>
        <li>
          <Link className="text-link" to="/checklist/students">
            Students
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
