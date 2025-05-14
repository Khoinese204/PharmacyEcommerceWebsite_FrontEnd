import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/customer/HomePage";
import Layout from "./components/layouts/CustomerLayout";
import ProductListPage from "./pages/customer/ProductListPage";
import ProductDetailPage from "./pages/customer/ProductDetailPage";

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
            <Route path="/" element={<HomePage />} />
            <Route
              path="/products/functional-foods"
              element={<ProductListPage />}
            />
            <Route
              path="/products/:productId"
              element={<ProductDetailPage />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
