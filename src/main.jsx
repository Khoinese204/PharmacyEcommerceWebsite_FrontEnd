import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
window.global = window;
createRoot(document.getElementById("root")).render(
  // Uncomment bên dưới để call API và không muốn bị gọi 2 lần
  // StrictMode chỉ ảnh hưởng trong development — trong production, React sẽ không render 2 lần.
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <App />
);
