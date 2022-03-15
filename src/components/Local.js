exports.getLocalStudents = ({ studentList, setStudentList }) => {
  if (localStorage.getItem("students") === null) {
    localStorage.setItem("students", JSON.stringify([]));
  } else {
    let studentsLocal = JSON.parse(
      localStorage.getItem("students", JSON.stringify(studentList))
    );
    setStudentList(studentsLocal);
  }
};

exports.getLocalTodos = ({ todos, setTodos }) => {
  if (localStorage.getItem("todos") === null) {
    localStorage.setItem("todos", JSON.stringify([]));
  } else {
    let todoLocal = JSON.parse(
      localStorage.getItem("todos", JSON.stringify(todos))
    );
    setTodos(todoLocal);
  }
};
