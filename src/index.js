import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // ← Make sure this import is here
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
