import React, { useState } from "react";
import BreadcrumbTo from "../../components/common/BreadcrumbTo";
import QuantityButton from "../../components/common/QuantityButton";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const [activeTab, setActiveTab] = useState("mo-ta");
  const { productId } = useParams(); // 👈 Lấy từ URL
  const breadcrumbItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Thực phẩm chức năng", path: "/products/functional-foods" },
    {
      label: "Nước súc miệng",
      path: `/products/functional-foods/${productId}`,
    },
  ];
  return (
    <div className="bg-white text-gray-800">
      {/* Breadcrumb */}
      <BreadcrumbTo items={breadcrumbItems}></BreadcrumbTo>

      {/* Top info */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img
            src="/product-mouthwash.jpg"
            alt="Nước súc miệng"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        <div>
          <h1
            style={{ fontSize: "30px" }}
            className="font-semibold mb-2 leading-snug text-left"
          >
            Nước súc miệng Pearlie White Fluorinze Anti-bacterial Fluoride 750ml
            chống lại vi khuẩn gây mảng bám sâu răng
          </h1>
          <div className="text-left mb-4">
            <span className="line-through text-gray-400 text-sm mr-2">
              168.000đ
            </span>
            <span className="text-blue-600 font-bold text-lg">
              132.000đ/chai
            </span>
          </div>
          <div className="text-left">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-1 w-fit mb-6">
              <QuantityButton enabled={true}></QuantityButton>
            </div>
          </div>

          <table className="text-left text-sm">
            <tbody>
              <tr>
                <td className="pr-4 py-1">Chọn đơn vị tính:</td>
                <td>Chai</td>
              </tr>
              <tr>
                <td className="pr-4 py-1">Danh mục:</td>
                <td>Nước súc miệng</td>
              </tr>
              <tr>
                <td className="pr-4 py-1">Mô tả ngắn:</td>
                <td>
                  Sản phẩm giúp loại bỏ vi khuẩn gây mùi, giữ hơi thở thơm mát
                </td>
              </tr>
              <tr>
                <td className="pr-4 py-1">Xuất xứ:</td>
                <td>Singapore</td>
              </tr>
              <tr>
                <td className="pr-4 py-1">Nhà sản xuất:</td>
                <td>CORLISON</td>
              </tr>
              <tr>
                <td className="pr-4 py-1">Nước sản xuất:</td>
                <td>Singapore</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* Sidebar Tabs */}
        <aside className="space-y-3">
          <button
            onClick={() => setActiveTab("mo-ta")}
            className={`w-full text-left py-2 px-3 rounded ${
              activeTab === "mo-ta"
                ? "bg-blue-100 text-blue-700 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            Mô tả sản phẩm
          </button>
          <button
            onClick={() => setActiveTab("thanh-phan")}
            className={`w-full text-left py-2 px-3 rounded ${
              activeTab === "thanh-phan"
                ? "bg-blue-100 text-blue-700 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            Thành phần
          </button>
          <button
            onClick={() => setActiveTab("cong-dung")}
            className={`w-full text-left py-2 px-3 rounded ${
              activeTab === "cong-dung"
                ? "bg-blue-100 text-blue-700 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            Công dụng
          </button>
          <button
            onClick={() => setActiveTab("cach-dung")}
            className={`w-full text-left py-2 px-3 rounded ${
              activeTab === "cach-dung"
                ? "bg-blue-100 text-blue-700 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            Cách dùng
          </button>
          <button
            onClick={() => setActiveTab("tac-dung-phu")}
            className={`w-full text-left py-2 px-3 rounded ${
              activeTab === "tac-dung-phu"
                ? "bg-blue-100 text-blue-700 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            Tác dụng phụ
          </button>
          <button
            onClick={() => setActiveTab("luu-y")}
            className={`w-full text-left py-2 px-3 rounded ${
              activeTab === "luu-y"
                ? "bg-blue-100 text-blue-700 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            Lưu ý
          </button>
          <button
            onClick={() => setActiveTab("bao-quan")}
            className={`w-full text-left py-2 px-3 rounded ${
              activeTab === "bao-quan"
                ? "bg-blue-100 text-blue-700 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            Bảo quản
          </button>
        </aside>

        {/* Main content */}
        <div className="text-left md:col-span-3">
          {activeTab === "mo-ta" && (
            <>
              <h2 className="text-base font-semibold mb-2">Mô tả sản phẩm</h2>
              <p className="mb-4">
                <strong>
                  Nước súc miệng Pearlie White Fluorinze Anti-bacterial Fluoride
                  750ml
                </strong>{" "}
                giúp loại bỏ vi khuẩn gây mùi và mảng bám, tăng cường men răng
                và giữ hơi thở thơm mát. Sản phẩm thích hợp cho người lớn và trẻ
                từ 6 tuổi trở lên.
              </p>
              <p className="mb-4">
                Mảng bám và sâu răng là hai vấn đề răng miệng phổ biến hiện
                nay...
              </p>
            </>
          )}

          {activeTab === "thanh-phan" && (
            <>
              <h2 className="text-base font-semibold mb-2">Thành phần</h2>
              <p>- CPC (Cetylpyridinium chloride)</p>
              <p>- Xylitol</p>
              <p>- Sodium fluoride, Flavor...</p>
            </>
          )}

          {activeTab === "cong-dung" && (
            <>
              <h2 className="text-base font-semibold mb-2">Công dụng</h2>
              <p>
                Hỗ trợ tiêu diệt vi khuẩn gây mùi, làm sạch mảng bám, bảo vệ men
                răng, giữ hơi thở thơm mát.
              </p>
            </>
          )}

          {activeTab === "cach-dung" && (
            <>
              <h2 className="text-base font-semibold mb-2">Cách dùng</h2>
              <p>
                Súc miệng 10–15ml, giữ trong 20–30 giây rồi nhổ ra. Không nuốt.
              </p>
            </>
          )}

          {activeTab === "tac-dung-phu" && (
            <>
              <h2 className="text-base font-semibold mb-2">Tác dụng phụ</h2>
              <p>Hiếm gặp: kích ứng nhẹ nếu dùng quá nhiều lần trong ngày.</p>
            </>
          )}

          {activeTab === "luu-y" && (
            <>
              <h2 className="text-base font-semibold mb-2">Lưu ý</h2>
              <p>Không dùng cho trẻ dưới 6 tuổi. Không được nuốt.</p>
            </>
          )}

          {activeTab === "bao-quan" && (
            <>
              <h2 className="text-base font-semibold mb-2">Bảo quản</h2>
              <p>Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
