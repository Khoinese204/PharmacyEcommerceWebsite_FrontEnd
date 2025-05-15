import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/customer/HomePage";
import Layout from "./components/layouts/CustomerLayout";
import ProductListPage from "./pages/customer/ProductListPage";
import ProductDetailPage from "./pages/customer/ProductDetailPage";
import CartPage from "./pages/customer/CartPage";
import CheckoutPage from "./pages/customer/CheckoutPage";
import OrderSuccessPage from "./pages/customer/OrderSuccessPage";
import OrderDetailPage from "./pages/staff/OrderDetailPage";
import OrderConfirmPage from "./pages/staff/OrderConfirmPage";

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
            <Route path="/" element={<OrderDetailPage />} />
            <Route
              path="/products/functional-foods"
              element={<ProductListPage />}
            />
            <Route
              path="/products/:productId"
              element={<ProductDetailPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/ordersuccess" element={<OrderSuccessPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
