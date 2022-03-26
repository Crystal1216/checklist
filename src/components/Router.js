import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "../Routes/Home";
import Schedule from "../Routes/Schedule";
import TodoList from "../Routes/TodoList";
import CheckList from "../Routes/CheckList";
import Students from "../Routes/StudentsList";
import SubmitList from "../Routes/SubmitList";
import SubmitSummary from "../Routes/SubmitSummary";

const AppRouter = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/todoList" element={<TodoList />} />
        <Route path="/check/:id" element={<CheckList />} />
        <Route path="/students" element={<Students />} />
        <Route path="/submit/:id" element={<SubmitList />} />
        <Route path="/submit/summary" element={<SubmitSummary />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
