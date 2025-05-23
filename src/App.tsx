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
import DashboardPage from "./pages/admin/DashboardPage";
import CustomerLayout from "./components/layouts/CustomerLayout";
import AdminRoutes from "./routes/AdminRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";

const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user?.role || "Customer";
};

function App() {
  const userRole = "Admin"; // ví dụ lấy từ localStorage, JWT, context...

  return (
    <BrowserRouter>
      {/* {userRole === "Admin" && <AdminRoutes />} */}
      {userRole === "Admin" && <AdminRoutes />}
    </BrowserRouter>
  );
}

export default App;
