// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "../../components/common/Product";
import RandomProduct from "../../components/common/RandomProduct";

interface ProductDto {
  id: number;
  name: string;
  imageUrl: string;
  originalPrice: number;
  discountedPrice: number; // <-- ✅ thêm dòng này
  unit: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    fetch("/api/medicines/best-selling")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => console.error("Không thể tải danh sách sản phẩm bán chạy"));
  }, []);

  const handleShowMore = () => {
    if (visibleCount < products.length) {
      setVisibleCount((prev) => prev + 4);
    }
  };

  const visibleProducts = products.slice(0, visibleCount);

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
            { img: "/images/category1.webp", label: "Thuốc", path: "drugs" },
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
        <RandomProduct
          products={visibleProducts.map((p) => ({
            id: p.id,
            name: p.name,
            image: `/images/products/${p.imageUrl}`,
            originalPrice: p.originalPrice ?? 0,
            discountedPrice: p.discountedPrice ?? p.originalPrice ?? 0, // <-- SỬA ở đây
            unit: p.unit,
          }))}
        />

        {visibleCount < products.length && (
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
}
