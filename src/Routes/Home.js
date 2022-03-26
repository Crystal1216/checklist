import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="Home">
      <div>
        <ul className="home-ul">
          <Link className="home-link" to="/checklist/schedule">
            <li>Calendar</li>
          </Link>
          <Link className="home-link dropdown" to="/checklist/todoList">
            <li>Todo</li>
          </Link>
          <Link className="home-link" to="/checklist/students">
            <li>Students</li>
          </Link>
          <Link className="home-link" to="/checklist/submit/summary">
            <li>Summary</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Home;
