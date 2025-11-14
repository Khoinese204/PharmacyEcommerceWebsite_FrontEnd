import React, { useEffect, useState, useRef } from "react";
// 1. Import Link
import { Link } from "react-router-dom";
import Product from "../../components/common/Product";
import RandomProduct from "../../components/common/RandomProduct";
import { BASE_IMAGE_URL } from "../../helper/constants";

// 2. Import cho useRef và icons
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// Import một số icon mẫu, bạn có thể thay thế bằng icon của riêng bạn
import {
  FaPills,
  FaLeaf,
  FaUserMd,
  FaFirstAid,
  FaHeartbeat,
  FaQuestionCircle, // Icon này không còn là mặc định
} from "react-icons/fa";

// Interface cho Product (giữ nguyên)
interface ProductDto {
  id: number;
  name: string;
  imageUrl: string;
  originalPrice: number;
  price: number;
  unit: string;
}

// Interface cho Category từ API (giữ nguyên)
interface ApiCategoryDto {
  id: number;
  name: string;
}

// 3. Interface mới cho Category sẽ hiển thị (thêm icon VÀ path)
interface DisplayCategory {
  id: number;
  name: string;
  icon: React.ElementType; // Kiểu dữ liệu cho một component Icon
  path: string; // <-- Thêm đường dẫn
}

// 4. "Từ điển" được nâng cấp
// Chứa cả icon và path
// BẠN PHẢI CẬP NHẬT KEY VÀ PATH CHO KHỚP VỚI DỰ ÁN CỦA BẠN
const categoryDataMap: {
  [key: string]: { icon: React.ElementType; path: string };
} = {
  Thuốc: {
    icon: FaPills,
    path: "/drugs", // <-- Cập nhật path này
  },
  "Thực phẩm chức năng": {
    icon: FaLeaf,
    path: "/functional-foods", // <-- Cập nhật path này
  },
  "Chăm sóc cá nhân": {
    icon: FaUserMd,
    path: "/personal-care", // <-- Cập nhật path này
  },
  "Thiết bị y tế": {
    icon: FaFirstAid,
    path: "/medical-devices",
  },
  "Kiểm tra sức khỏe": {
    icon: FaHeartbeat,
    path: "/health-check",
  },
};

// Dữ liệu mặc định nếu không tìm thấy
const defaultCategoryData = {
  // ✅ ĐÃ THAY ĐỔI: Icon mặc định giờ là FaPills
  icon: FaPills,
  path: "/products", // Đường dẫn mặc định cho danh mục mới
};

export default function HomePage() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [categories, setCategories] = useState<DisplayCategory[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);

  // Thêm useRef để tham chiếu đến container cuộn
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
        // 5. Cập nhật logic map để lấy cả icon và path
        const displayCategories = apiCategories.map((apiCat) => {
          // Dòng này sẽ tự động gán defaultCategoryData (với icon FaPills)
          // nếu apiCat.name không tìm thấy trong categoryDataMap
          const data = categoryDataMap[apiCat.name] ?? defaultCategoryData;
          return {
            id: apiCat.id,
            name: apiCat.name,
            icon: data.icon, // Lấy icon
            path: data.path, // Lấy path
          };
        });
        setCategories(displayCategories);
      })
      .catch(() => console.error("Không thể tải danh mục sản phẩm"));
  }, []); // Rỗng để chỉ chạy 1 lần

  // Hàm xử lý "Xem thêm"
  const handleShowMore = () => {
    if (visibleCount < products.length) {
      setVisibleCount((prev) => prev + 4);
    }
  };

  const visibleProducts = products.slice(0, visibleCount);

  // Hàm xử lý cuộn
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

      {/* Danh mục sản phẩm (Kiểu cuộn ngang) */}
      <section className="py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-blue-700">Danh Mục Sản Phẩm</h2>
        <p className="text-gray-600 mt-2">
          Giải pháp chăm sóc sức khỏe toàn diện cho bạn và gia đình.
        </p>

        {/* Container tương đối để chứa các mũi tên tuyệt đối */}
        <div className="relative max-w-screen-xl mx-auto mt-8">
          {/* Mũi tên Trái */}
          <button
            onClick={() => handleScroll(-300)} // Cuộn 300px sang trái
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
            aria-label="Cuộn sang trái"
          >
            <FiChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          {/* Container cuộn */}
          <div
            ref={scrollContainerRef}
            className="flex items-start space-x-6 overflow-x-auto scroll-smooth scrollbar-hide py-4 px-12" // px-12 để chừa chỗ cho mũi tên
          >
            {/* Render danh mục từ state */}
            {categories.map((cat) => {
              const IconComponent = cat.icon; // Lấy component Icon
              return (
                // Thay thế 'div' bằng 'Link'
                <Link
                  key={cat.id}
                  to={cat.path} // <-- Sử dụng path từ state
                  className="flex flex-col items-center flex-shrink-0 w-28 cursor-pointer group"
                >
                  {/* Khối chứa Icon (giống trong hình) */}
                  <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center transition group-hover:bg-blue-200">
                    <IconComponent className="text-blue-600 text-3xl" />
                  </div>
                  {/* Tên danh mục */}
                  <p className="mt-2 text-sm font-medium text-gray-700 text-center break-words">
                    {cat.name}
                  </p>
                </Link> // <-- Đóng thẻ Link
              );
            })}
          </div>

          {/* Mũi tên Phải */}
          <button
            onClick={() => handleScroll(300)} // Cuộn 300px sang phải
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
