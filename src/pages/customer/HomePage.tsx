import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-white">
      {/* Banner section */}
      <div className="relative">
        <img
          src="/banner.jpg"
          alt="Banner"
          className="w-full object-cover h-[400px]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-cyan-500 bg-opacity-80 text-white p-6 rounded-xl text-center">
            <p className="text-sm font-medium tracking-wide">
              EFFECTIVE MEDICINE, NEW MEDICINE EVERYDAY
            </p>
            <h1 className="text-3xl font-extrabold mt-2">
              WELCOME TO PRIMECARE
            </h1>
          </div>
        </div>
      </div>

      {/* Danh mục sản phẩm */}
      <section className="py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-blue-700">Danh Mục Sản Phẩm</h2>
        <p className="text-gray-600 mt-2">
          Giải pháp chăm sóc sức khỏe toàn diện cho bạn và gia đình.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            { img: "/category1.jpg", label: "Thuốc", path: "/category/drugs" },
            {
              img: "/category2.jpg",
              label: "Thực phẩm chức năng",
              path: "/products/functional-foods",
            },
            {
              img: "/category3.jpg",
              label: "Chăm sóc cá nhân",
              path: "/category/personal-care",
            },
          ].map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <Link
                key={idx}
                to={cat.path}
                className="flex flex-col items-center hover:opacity-90 transition"
              >
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="rounded-lg shadow-md h-48 object-cover"
                />
                <p className="mt-3 font-medium text-gray-700">{cat.label}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="py-12 px-4">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">
          Best Selling Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <img
                src={`/product${i + 1}.jpg`}
                alt="Product"
                className="h-40 w-full object-contain mb-3"
              />
              <p className="text-sm font-medium text-gray-800 mb-1">
                Tên sản phẩm demo
              </p>
              <p className="text-blue-700 font-bold text-sm mb-1">
                165.000đ/hộp
              </p>
              <p className="text-xs text-gray-500 mb-2">Hộp 2 vỉ x 10 ống</p>
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm py-1 px-4 rounded-full">
                Thêm vào giỏ hàng
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="text-cyan-600 hover:underline font-medium">
            Xem thêm
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
