import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import ReactForm from "./components/ReactForm.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <ReactForm /> */}
  </StrictMode>
);
