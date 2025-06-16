import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import BreadcrumbBack from "../../components/common/BreadcrumbBack";

import Footer from "../../components/common/Footer";
import Navbar from "./NavBar";
import { useLocation, useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  // const breadcrumbItems = [{ label: "Quay lại trang chủ", path: "/" }];
  const location = useLocation();
  // useEffect(() => {
  //   if (location.pathname === "/auth") {
  //     setActiveTab("login"); // ✅ reset khi quay lại
  //   }
  // }, [location.pathname]);

  // ✅ Reset tab khi vào /auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");

    if (token && user?.role?.name) {
      // đã đăng nhập → điều hướng
      switch (user.role.name) {
        case "Admin":
          navigate("/admin/dashboard");
          return;
        case "Sales":
          navigate("/sales/dashboard");
          return;
        case "Warehouse":
          navigate("/warehouse/dashboard");
          return;
        default:
          navigate("/");
          return;
      }
    }

    // Không có token thì reset lại tab login
    setActiveTab("login");
  }, [location.pathname]);

  return (
    <>
      <Navbar></Navbar>
      {/* <BreadcrumbBack items={breadcrumbItems}></BreadcrumbBack> */}
      {/* dòng code ở dưới để dãn đều khoảng cách giữa content với footer và content với navbar và áp dụng cho nhiều màn hình tương tự */}
      <div className="py-10 bg-white flex items-start justify-center pt-20">
        <div className="w-full max-w-md bg-white p-6 rounded-md shadow-sm">
          {/* Tabs */}
          <div className="flex justify-center items-center gap-15 border-b border-gray-200 mb-4">
            <button
              onClick={() => setActiveTab("login")}
              className={`text-lg px-2 py-1 font-semibold ${
                activeTab === "login"
                  ? "text-blue-800 border-b-2 border-orange-500"
                  : "text-blue-300 hover:text-black"
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`text-lg px-2 py-1 font-semibold ${
                activeTab === "register"
                  ? "text-blue-800 border-b-2 border-orange-500"
                  : "text-blue-300 hover:text-black"
              }`}
            >
              Đăng kí
            </button>
          </div>

          {/* Form content */}
          {activeTab === "login" ? <LoginForm /> : <SignUpForm />}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
