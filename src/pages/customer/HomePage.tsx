import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Product from "../../components/common/Product";
import RandomProduct from "../../components/common/RandomProduct";
import { BASE_IMAGE_URL } from "../../helper/constants";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CustomerChatWidget from "../../components/common/CustomerChatWidget";
import AiAssistantWidget from "../../components/common/AiAssistantWidget";

// Interface cho Product
interface ProductDto {
  id: number;
  name: string;
  imageUrl: string;
  originalPrice: number;
  price: number;
  unit: string;
}

// Interface cho Category từ API
interface ApiCategoryDto {
  id: number;
  name: string;
  imageUrl: string;
  slug: string;
}

// Định nghĩa URL cơ sở cho ảnh category
const IMAGE_BASE_URL = "http://localhost:8080/uploads/categories/";

export default function HomePage() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [categories, setCategories] = useState<ApiCategoryDto[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch products
    fetch("/api/medicines/best-selling")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => console.error("Không thể tải danh sách sản phẩm bán chạy"));

    // Fetch categories
    fetch("/api/categories")
      .then((res) => res.json())
      .then((apiCategories: ApiCategoryDto[]) => {
        setCategories(apiCategories);
      })
      .catch(() => console.error("Không thể tải danh mục sản phẩm"));
  }, []);

  const handleShowMore = () => {
    if (visibleCount < products.length) {
      setVisibleCount((prev) => prev + 4);
    }
  };

  const visibleProducts = products.slice(0, visibleCount);

  const handleScroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

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
        <AiAssistantWidget />
        <CustomerChatWidget />
        <h2 className="text-2xl font-bold text-blue-700">Danh Mục Sản Phẩm</h2>
        <p className="text-gray-600 mt-2">
          Giải pháp chăm sóc sức khỏe toàn diện cho bạn và gia đình.
        </p>

        <div className="relative max-w-screen-xl mx-auto mt-8">
          {/* Mũi tên Trái */}
          <button
            onClick={() => handleScroll(-300)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
            aria-label="Cuộn sang trái"
          >
            <FiChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          {/* Container cuộn */}
          <div
            ref={scrollContainerRef}
            className="flex items-start space-x-6 overflow-x-auto scroll-smooth scrollbar-hide py-4 px-12"
          >
            {categories.map((cat) => (
              <Link
                key={cat.id}
                // ✅ SỬA Ở ĐÂY: Thêm tiền tố "/category/" vào trước slug
                // Ví dụ: slug là "thuoc" -> link sẽ là "/category/thuoc"
                to={`/category/${cat.slug}`}
                className="flex flex-col items-center flex-shrink-0 w-28 cursor-pointer group"
              >
                <img
                  src={`${IMAGE_BASE_URL}${cat.imageUrl}`}
                  alt={cat.name}
                  className="w-16 h-16 rounded-lg object-cover bg-gray-100 transition group-hover:opacity-90 shadow-sm"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/64x64/e0f2fe/0284c7?text=?")
                  }
                />
                <p className="mt-2 text-sm font-medium text-gray-700 text-center break-words">
                  {cat.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Mũi tên Phải */}
          <button
            onClick={() => handleScroll(300)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
            aria-label="Cuộn sang phải"
          >
            <FiChevronRight className="w-6 h-6 text-gray-600" />
          </button>
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
            image: `${BASE_IMAGE_URL}${p.imageUrl}`,
            originalPrice: p.originalPrice ?? 0,
            price: p.price ?? p.originalPrice ?? 0,
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
