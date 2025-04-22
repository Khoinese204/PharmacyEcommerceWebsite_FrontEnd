import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <div className="bg-green-200 p-8 text-center">
        <h1 className="text-3xl font-bold text-blue-700">
          Hello Tailwind đã hoạt động!
        </h1>
      </div> */}
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
