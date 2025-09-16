import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "../app/globals.css"; // Make sure the path is correct

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);