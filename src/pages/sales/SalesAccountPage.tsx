import BreadcrumbTo from "../../components/common/BreadcrumbTo";
import UserSidebar from "../../components/common/UserSidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePickerWithIcon from "../../components/common/DatePickerWithIcon";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/common/AdminSideBar";
import WarehouseSidebar from "../../components/common/WarehouseSideBar";
import SalesSidebar from "../../components/common/SalesSideBar";

const breadcrumbItems = [
  { label: "Quay lại", path: "/sales/dashboard" },
  { label: "Thông tin cá nhân", path: "/sales/account" },
];

export default function SalesAccountPage() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  return (
    <div className="bg-gray-50 min-h-screen text-sm">
      {/* Breadcrumb */}
      {/* Header */}
      <header className="flex items-center px-6 py-4 bg-white shadow-sm shrink-0">
        <div className="flex items-center gap-4 text-black text-lg">
          <div className="font-bold text-lg text-blue-600">PrimeCare</div>
        </div>
      </header>
      <BreadcrumbTo items={breadcrumbItems}></BreadcrumbTo>

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Sidebar */}
        <SalesSidebar activePath="/account" />
        {/* Main content */}
        <div className="md:col-span-3">
          <div className="bg-white p-6 rounded-md shadow-sm md:col-span-3">
            <h2 className="text-base font-semibold mb-4 text-black">
              THÔNG TIN CÁ NHÂN
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Avatar */}
              <div className="flex flex-col items-center col-span-1">
                <img
                  src="/avatar-default.png"
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border object-cover"
                />
                <button className="mt-3 px-3 py-1 bg-cyan-400 text-white text-sm rounded-md">
                  Cập nhật ảnh mới
                </button>
                <p className="mt-2 text-xs text-gray-500 text-center">
                  Dung lượng file tối đa 5 MB.
                  <br />
                  Định dạng .JPEG, .PNG
                </p>
              </div>

              {/* Form fields */}
              <div className="text-left text-black col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Họ tên
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    defaultValue="Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Ngày sinh
                  </label>
                  <DatePickerWithIcon
                    value={birthDate}
                    onChange={setBirthDate}
                    placeholder="Ngày sinh"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    defaultValue="user@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Giới tính
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option>Giới tính</option>
                    <option>Nam</option>
                    <option>Nữ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Mật khẩu
                  </label>
                  <div className="flex items-center">
                    <input
                      type="password"
                      value="********"
                      readOnly
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                    <Link
                      to="/account/change-password"
                      className="text-sm text-cyan-500 ml-2 whitespace-nowrap"
                    >
                      Cập nhật
                    </Link>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập số nhà, tên đường, số phường, tên quận, tên tỉnh"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>

              {/* Save button */}
              <div className="md:col-span-4 flex justify-center mt-6">
                <button className="bg-cyan-400 text-white px-6 py-2 rounded-md font-semibold">
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
