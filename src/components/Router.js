import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/checklist" element={<Home />} />
        <Route path="/checklist/schedule" element={<Schedule />} />
        <Route path="/checklist/todoList" element={<TodoList />} />
        <Route path="/checklist/check/:id" element={<CheckList />} />
        <Route path="/checklist/students" element={<Students />} />
        <Route path="/checklist/submit/:id" element={<SubmitList />} />
        <Route path="/checklist/submit/summary" element={<SubmitSummary />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
