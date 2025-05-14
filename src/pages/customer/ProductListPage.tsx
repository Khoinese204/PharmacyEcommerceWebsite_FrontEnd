import React from "react";
import { Link } from "react-router-dom";

const ProductListPage = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Breadcrumb */}
      <div className="bg-cyan-100 text-sm p-4">
        <div className="max-w-6xl mx-auto text-left">
          <span className="text-gray-700">Trang chủ</span> &gt;{" "}
          <span className="font-medium">Thực phẩm chức năng</span>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-2">Thực phẩm chức năng</h1>
        <p className="text-gray-600 text-sm mb-6">
          Các sản phẩm hỗ trợ sức khỏe đa dạng dành cho mọi nhu cầu.
        </p>

        {/* Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            "Vitamin & Khoáng chất",
            "Cải thiện chức năng",
            "Hỗ trợ điều trị",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center bg-gray-100 rounded-lg p-4 shadow-sm"
            >
              <div className="h-10 w-10 bg-cyan-500 rounded-full mr-3"></div>
              <div className="text-sm">
                {item} <br />{" "}
                <span className="text-xs text-gray-500">5 sản phẩm</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar filter */}
          <aside className="md:col-span-1 hidden md:block">
            <h2 className="font-semibold text-lg mb-4">Filters</h2>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>Đối tượng sử dụng</li>
              <li>Giới tính</li>
              <li>Chi nhánh</li>
              <li>Thương hiệu</li>
            </ul>
          </aside>

          {/* Product list */}
          <main className="md:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Danh sách sản phẩm</h2>
              <div className="text-sm">
                Sắp xếp theo:{" "}
                <select className="border rounded px-2 py-1 text-sm">
                  <option>Bán chạy</option>
                  <option>Giá thấp đến cao</option>
                  <option>Giá cao đến thấp</option>
                </select>
              </div>
            </div>

            {/* Products */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border rounded-lg p-4 shadow-sm">
                  <Link
                    key={i}
                    to={`/products/${i}`}
                    className="border rounded-lg p-4 shadow-sm hover:shadow-md transition block"
                  >
                    <div className="h-32 bg-gray-200 rounded mb-2"></div>
                    <h3 className="text-sm font-semibold">Tên sản phẩm</h3>
                    <p className="text-blue-600 font-bold">165.000đ/hộp</p>
                    <p className="text-xs text-gray-500 mb-2">
                      Hộp 2 vỉ x 10 ống
                    </p>
                  </Link>
                  <button className="w-full bg-cyan-400 text-white py-1 rounded hover:bg-cyan-500 text-sm">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <button className="bg-cyan-400 text-white py-1 px-6 rounded hover:bg-cyan-500 text-sm w-fit mx-auto">
                Xem thêm
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
