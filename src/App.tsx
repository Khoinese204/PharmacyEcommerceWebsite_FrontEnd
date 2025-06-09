import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/customer/HomePage";
import Layout from "./components/layouts/CustomerLayout";
import ProductListPage from "./pages/customer/FunctionalFoodProductListPage";
import ProductDetailPage from "./pages/customer/ProductDetailPage";
import CartPage from "./pages/customer/CartPage";
import CheckoutPage from "./pages/customer/CheckoutPage";
import OrderSuccessPage from "./pages/customer/OrderSuccessPage";
import OrderDetailPage from "./pages/sales/OrderDetailPage";
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
import SalesRoutes from "./routes/SalesRoutes";
import WarehouseRoutes from "./routes/WarehouseRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const role = localStorage.getItem("role") || "Customer";

  const renderRoutesByRole = () => {
    switch (role) {
      case "Admin":
        return <AdminRoutes />;
      case "Sales Staff":
        return <SalesRoutes />;
      case "Warehouse Staff":
        return <WarehouseRoutes />;
      case "Customer":
      default:
        return <CustomerRoutes />;
    }
  };

  return (
    <BrowserRouter>
      {renderRoutesByRole()}
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;