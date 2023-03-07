import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Route, Routes } from "react-router-dom";
import Registration from "./pages/registration";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
