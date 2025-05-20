import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import BreadcrumbBack from "../../components/common/BreadcrumbBack";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const breadcrumbItems = [{ label: "Quay lại trang chủ", path: "/" }];
  return (
    <>
      <BreadcrumbBack items={breadcrumbItems}></BreadcrumbBack>
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
    </>
  );
}
