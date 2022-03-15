import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import CheckList from "./components/CheckList";
import NavBar from "./components/NavBar";
import Students from "./components/Students";
import SubmitList from "./components/SubmitList";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/todoList" element={<TodoList />} />
        <Route path="/check/:id" element={<CheckList />} />
        <Route path="/students" element={<Students />} />
        <Route path="/submit/:id" element={<SubmitList />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
