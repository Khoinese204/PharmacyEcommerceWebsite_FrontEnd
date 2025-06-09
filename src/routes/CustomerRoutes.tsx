import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/customer/HomePage";
import OrderHistoryPage from "../pages/customer/OrderHistoryPage";
import CustomerLayout from "../components/layouts/CustomerLayout";
import ProductListPage from "../pages/customer/FunctionalFoodProductListPage";
import ProductDetailPage from "../pages/customer/ProductDetailPage";
import CartPage from "../pages/customer/CartPage";
import CheckoutPage from "../pages/customer/CheckoutPage";
import OrderSuccessPage from "../pages/customer/OrderSuccessPage";
import OrderFailPage from "../pages/customer/OrderFailPage";
import ProfilePage from "../pages/customer/ProfilePage";
import ChangePasswordForm from "../pages/customer/ChangePasswordForm";
import CouponCardPage from "../pages/customer/CouponCardPage";
import AuthPage from "../pages/common/AuthPage";
import LoginForm from "../pages/common/LoginForm";
import SignUpForm from "../pages/common/SignUpForm";
import SignUpSuccessPage from "../pages/common/SignUpSuccessPage";
import ForgotPasswordPage from "../pages/common/ForgotPasswordPage";
import ResetPasswordPage from "../pages/common/ResetPasswordPage";
import ResetPasswordSuccessPage from "../pages/common/ResetPasswordSuccessPage";
import CustomerOrderDetailPage from "../pages/customer/CustomerOrderDetailPage";
import FunctionalFoodProductListPage from "../pages/customer/FunctionalFoodProductListPage";
import DrugProductListPage from "../pages/customer/DrugProductListPage";
import PersonalCareProductListPage from "../pages/customer/PersonalCareProductListPage";

export default function CustomerRoutes() {
  return (
    <CustomerLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/functional-foods"
          element={<FunctionalFoodProductListPage />}
        />
        <Route path="/drugs" element={<DrugProductListPage />} />
        <Route
          path="/personal-care"
          element={<PersonalCareProductListPage />}
        />
        <Route
          path="/functional-foods/:productId"
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
        <Route path="/account/orderhistory" element={<OrderHistoryPage />} />
        <Route path="/account/profile" element={<ProfilePage />} />
        <Route
          path="/account/change-password"
          element={<ChangePasswordForm />}
        />
        <Route path="/account/couponcard" element={<CouponCardPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signupsuccess" element={<SignUpSuccessPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/resetpassword" element={<ResetPasswordPage />} />
        
        <Route
          path="/resetpasswordsuccess"
          element={<ResetPasswordSuccessPage />}
        />
      </Routes>
    </CustomerLayout>
  );
}
