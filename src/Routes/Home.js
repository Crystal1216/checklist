import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="Home">
      <div>
        <ul className="home-ul">
          <Link className="home-link" to="/schedule">
            <li>Schedule</li>
          </Link>
          <Link className="home-link dropdown" to="/todoList">
            <li>CheckList</li>
          </Link>
          <Link className="home-link" to="/students">
            <li>Students</li>
          </Link>
          <Link className="home-link" to="/submit/summary">
            <li>Summary</li>
          </Link>
          <Link className="home-link" to="/download">
            <li>Download</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Home;
