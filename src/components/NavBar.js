import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <nav>
      <ul className="nav-ul">
        <li>
          <Link className="text-link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-link" to="/todoList">
            List
          </Link>
        </li>
        <li>
          <Link className="text-link" to="/students">
            Students
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
