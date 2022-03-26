import { Link } from "react-router-dom";

const Todo = ({ todo, todos, setTodos }) => {
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  };
  const completeHandler = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };
  return (
    <li className="todo-li">
      <p className="todo-deadline">{todo.deadline}</p>
      <div className="todo-li-box">
        <div className="todo-text-div">
          <p className={`todo-item ${todo.completed ? "completed" : ""}`}>
            {todo.text}
          </p>
        </div>
        <div className="todo-btn-box">
          <button onClick={deleteHandler} className="todo-trash-btn">
            <i className="fas fa-trash"></i>
          </button>
          <Link to={`/checklist/check/${todo.id}`} state={{ todo }}>
            <button className="todo-go-btn">
              <i className="fas fa-arrow-right"></i>
            </button>
          </Link>
          <button onClick={completeHandler} className="todo-complete-btn">
            <i className="fas fa-check"></i>
          </button>
        </div>
      </div>
    </li>
  );
};

export default Todo;
