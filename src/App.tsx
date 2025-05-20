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
import CustomerOrderDetailPage from "./pages/customer/CustomerOrderDetailPage";
import OrderHistoryPage from "./pages/customer/OrderHistoryPage";
import ProfilePage from "./pages/customer/ProfilePage";
import ChangePasswordForm from "./pages/customer/ChangePasswordForm";
import CouponCardPage from "./pages/customer/CouponCardPage";
import LoginPage from "./pages/common/LoginForm";
import SignUpPage from "./pages/common/SignUpForm";
import LoginForm from "./pages/common/LoginForm";
import SignUpForm from "./pages/common/SignUpForm";
import AuthPage from "./pages/common/AuthPage";
import SignUpSuccessPage from "./pages/common/SignUpSuccessPage";
import OrderFailPage from "./pages/customer/OrderFailPage";
import ForgotPasswordPage from "./pages/common/ForgotPasswordPage";
import ResetPasswordPage from "./pages/common/ResetPasswordPage";
import ResetPasswordSuccessPage from "./pages/common/ResetPasswordSuccessPage";

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
              path="/products/functional-foods/:productId"
              element={<ProductDetailPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/ordersuccess" element={<OrderSuccessPage />} />
            <Route path="/orderfail" element={<OrderFailPage />} />
            <Route
              path="/account/orderhistory/:orderId"
              element={<CustomerOrderDetailPage />}
            />
            <Route
              path="/account/orderhistory"
              element={<OrderHistoryPage />}
            />
            <Route path="/account/profile" element={<ProfilePage />} />
            <Route
              path="/account/change-password"
              element={<ChangePasswordForm />}
            />
            <Route path="/account/couponcard" element={<CouponCardPage />} />
            <Route
              path="/products/:productId"
              element={<ProductDetailPage />}
            />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/signupsuccess" element={<SignUpSuccessPage />} />
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
            <Route path="/resetpassword" element={<ResetPasswordPage />} />
            <Route path="/resetpasswordsuccess" element={<ResetPasswordSuccessPage/>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
