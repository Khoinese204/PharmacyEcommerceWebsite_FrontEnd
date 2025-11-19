import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/customer/HomePage";
import OrderHistoryPage from "../pages/customer/OrderHistoryPage";
import CustomerLayout from "../components/layouts/CustomerLayout";
import ProductDetailPage from "../pages/customer/ProductDetailPage";
import CartPage from "../pages/customer/CartPage";
import CheckoutPage from "../pages/customer/CheckoutPage";
import OrderSuccessPage from "../pages/customer/OrderSuccessPage";
import OrderFailPage from "../pages/customer/OrderFailPage";
import ProfilePage from "../pages/customer/ProfilePage";
import ChangePasswordForm from "../pages/customer/ChangePasswordForm";
import CouponCardPage from "../pages/customer/CouponCardPage";
import ResetPasswordSuccessPage from "../pages/common/ResetPasswordSuccessPage";
import CustomerOrderDetailPage from "../pages/customer/CustomerOrderDetailPage";
import PaymentTransferPage from "../pages/customer/PaymentTransferPage";
import RandomProductDetailPage from "../pages/customer/RandomProductDetailPage";
import VnpayReturnPage from "../pages/customer/VnpayReturnPage";
import CategoryProductListPage from "../pages/customer/CategoryProductListPage";

export default function CustomerRoutes() {
  return (
    <CustomerLayout>
      <Routes>
        <Route path="" element={<HomePage />} />

        {/* ✅ ROUTE MỚI: Danh mục động */}
        {/* Ví dụ: /category/thuoc, /category/thuc-pham-chuc-nang */}
        <Route path="category/:slug" element={<CategoryProductListPage />} />

        {/* ✅ ROUTE MỚI: Chi tiết thuốc */}
        {/* Khớp với Link trong Product.tsx: /medicines/:id */}
        <Route path="medicines/:productId" element={<ProductDetailPage />} />

        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="/checkout/vnpay-return" element={<VnpayReturnPage />} />
        <Route path="ordersuccess" element={<OrderSuccessPage />} />
        <Route path="orderfail" element={<OrderFailPage />} />

        <Route
          path="/account/orderhistory/:id"
          element={<CustomerOrderDetailPage />}
        />
        <Route path="account/orderhistory" element={<OrderHistoryPage />} />
        <Route path="account/profile" element={<ProfilePage />} />
        <Route
          path="account/change-password"
          element={<ChangePasswordForm />}
        />
        <Route path="account/couponcard" element={<CouponCardPage />} />

        {/* Route cũ cho products vẫn giữ để tương thích nếu cần */}
        <Route path="products/:productId" element={<ProductDetailPage />} />

        <Route
          path="resetpasswordsuccess"
          element={<ResetPasswordSuccessPage />}
        />

        <Route
          path="checkout/payment-transfer"
          element={<PaymentTransferPage />}
        ></Route>

        <Route path="/:productId" element={<RandomProductDetailPage />} />
      </Routes>
    </CustomerLayout>
  );
}
