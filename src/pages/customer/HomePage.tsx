import React, { useState } from "react";
import { Link } from "react-router-dom";
import Product from "../../components/common/Product";

const allProducts = [
  {
    id: 1,
    name: "Vitamin C 500mg",
    image: "/images/products/product1.jpg",
    originalPrice: 165000,
    discountedPrice: 165000,
    unit: "hộp",
  },
  {
    id: 2,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product2.jpg",
    originalPrice: 200000,
    discountedPrice: 180000,
    unit: "lon",
  },
  {
    id: 3,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product3.jpg",
    originalPrice: 200000,
    discountedPrice: 200000,
    unit: "lon",
  },
  {
    id: 4,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product4.jpg",
    originalPrice: 200000,
    discountedPrice: 200000,
    unit: "lon",
  },
  {
    id: 5,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product5.jpg",
    originalPrice: 200000,
    discountedPrice: 180000,
    unit: "lon",
  },
  {
    id: 6,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product6.jpg",
    originalPrice: 200000,
    discountedPrice: 180000,
    unit: "lon",
  },
  {
    id: 7,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product7.jpg",
    originalPrice: 180000,
    discountedPrice: 180000,
    unit: "lon",
  },
  {
    id: 8,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product8.jpg",
    originalPrice: 200000,
    discountedPrice: 180000,
    unit: "lon",
  },
  {
    id: 9,
    name: "Sữa tăng đề kháng extra",
    image: "/images/products/product9.jpg",
    originalPrice: 210000,
    discountedPrice: 190000,
    unit: "lon",
  },
  {
    id: 10,
    name: "Sữa tăng đề kháng extra",
    image: "/images/products/product10.jpg",
    originalPrice: 210000,
    discountedPrice: 190000,
    unit: "lon",
  },
  {
    id: 11,
    name: "Sữa tăng đề kháng extra",
    image: "/images/products/product11.jpg",
    originalPrice: 210000,
    discountedPrice: 190000,
    unit: "lon",
  },
];

const HomePage = () => {
  const [visibleCount, setVisibleCount] = useState(8);

  const handleShowMore = () => {
    if (visibleCount < allProducts.length) {
      setVisibleCount((prev) => prev + 4);
    }
  };

  const visibleProducts = allProducts.slice(0, visibleCount);

  return (
    <div className="bg-white">
      {/* Banner section */}
      <div
        className="relative h-[400px] bg-center bg-cover max-w-screen-xl mx-auto"
        style={{ backgroundImage: "url(/images/Banner.jpg)" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center drop-shadow-md">
            <p className="text-sm font-medium tracking-wide text-blue-900">
              EFFECTIVE MEDICINE, NEW MEDICINE EVERYDAY
            </p>
            <h1 className="text-4xl font-extrabold mt-2 text-white drop-shadow-md">
              Welcome to PrimeCare
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
            {
              img: "/images/category1.webp",
              label: "Thuốc",
              path: "drugs",
            },
            {
              img: "/images/category2.jpg",
              label: "Thực phẩm chức năng",
              path: "functional-foods",
            },
            {
              img: "/images/category3.jpg",
              label: "Chăm sóc cá nhân",
              path: "personal-care",
            },
          ].map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <Link
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

        <Product products={visibleProducts} categoryPath="functional-foods" />

        {visibleCount < allProducts.length && (
          <div className="text-center mt-8">
            <button
              onClick={handleShowMore}
              className="text-cyan-600 hover:underline font-medium"
            >
              Xem thêm
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
