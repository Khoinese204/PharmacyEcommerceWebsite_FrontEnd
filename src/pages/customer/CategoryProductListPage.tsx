import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import BreadcrumbTo from "../../components/common/BreadcrumbTo";
import Product from "../../components/common/Product";
import { BASE_IMAGE_URL } from "../../helper/constants";

// Interface cho sản phẩm
interface ProductDto {
  id: number;
  name: string;
  imageUrl: string;
  originalPrice: number;
  price: number;
  unit: string;
  brand?: string; // Thêm trường brand
}

// Interface cho danh mục
interface CategoryDto {
  id: number;
  name: string;
  slug: string;
}

export default function CategoryProductListPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState(""); // Tên hiển thị (sẽ có dấu)

  // State cho bộ lọc
  const [visibleCount, setVisibleCount] = useState(8);
  const [priceRange, setPriceRange] = useState<string>("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const sortParam = searchParams.get("sort") as "asc" | "desc" | "" | null;
  const sortOption: "asc" | "desc" | "" = sortParam ?? "";

  // ✅ 1. Logic Fetch dữ liệu thông minh hơn
  useEffect(() => {
    if (!slug) return;

    setLoading(true);

    // Gọi song song 2 API:
    // 1. Lấy thuốc theo slug
    // 2. Lấy tất cả danh mục để tìm cái tên có dấu đúng
    Promise.all([
      fetch(`/api/categories/${slug}/medicines`).then((res) => res.json()),
      fetch(`/api/categories`).then((res) => res.json()),
    ])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);

        // Tìm danh mục trong list vừa lấy về để lấy tên chuẩn (VD: "Thuốc")
        const currentCategory = (categoriesData as CategoryDto[]).find(
          (cat) => cat.slug === slug
        );

        if (currentCategory) {
          setCategoryName(currentCategory.name); // ✅ Lấy tên có dấu từ DB
        } else {
          // Fallback nếu không tìm thấy
          setCategoryName(
            slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")
          );
        }
      })
      .catch((err) => console.error("Lỗi tải dữ liệu:", err))
      .finally(() => setLoading(false));
  }, [slug]);

  // --- Logic Bộ lọc & Sắp xếp ---

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleSortChange = (option: "asc" | "desc") => {
    setSearchParams({ sort: option });
  };

  const handleReset = () => {
    setPriceRange("");
    setSelectedBrands([]);
    setSearchParams({});
    setVisibleCount(8);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  // Lấy danh sách thương hiệu từ sản phẩm hiện có
  const brands = Array.from(
    new Set(products.map((p) => p.brand).filter(Boolean) as string[])
  );

  const filteredProducts = products.filter((product) => {
    const matchPrice =
      (priceRange === "under-100" && product.price < 100000) ||
      (priceRange === "100-300" &&
        product.price >= 100000 &&
        product.price <= 300000) ||
      (priceRange === "300-500" &&
        product.price > 300000 &&
        product.price <= 500000) ||
      (priceRange === "above-500" && product.price > 500000) ||
      priceRange === "";

    const matchBrand =
      selectedBrands.length === 0 ||
      (product.brand && selectedBrands.includes(product.brand));

    return matchPrice && matchBrand;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "asc") return a.price - b.price;
    if (sortOption === "desc") return b.price - a.price;
    return 0;
  });

  const visibleProducts = sortedProducts.slice(0, visibleCount);

  return (
    <div className="bg-white text-gray-800">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-4">
        <div className="text-sm text-gray-500 mb-4">
          Trang chủ /{" "}
          <span className="font-medium text-gray-800 capitalize">
            {categoryName}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Tiêu đề chính hiển thị tên có dấu */}
        <h1 className="text-3xl font-bold text-blue-700 mb-2 capitalize">
          {categoryName}
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Danh sách các sản phẩm chất lượng cao thuộc danh mục {categoryName}.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* === SIDEBAR BỘ LỌC === */}
          <aside className="md:col-span-1 hidden md:block text-left">
            <div className="sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Bộ lọc</h2>
                <button
                  onClick={handleReset}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Xóa lọc
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold mb-2 text-gray-700">Khoảng giá</h3>
                {[
                  { label: "Dưới 100.000đ", value: "under-100" },
                  { label: "100.000đ - 300.000đ", value: "100-300" },
                  { label: "300.000đ - 500.000đ", value: "300-500" },
                  { label: "Trên 500.000đ", value: "above-500" },
                ].map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() =>
                      setPriceRange(priceRange === value ? "" : value)
                    }
                    className={`w-full border rounded px-3 py-2 text-left text-sm transition-colors ${
                      priceRange === value
                        ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                        : "border-gray-200 text-gray-600 hover:border-blue-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {brands.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-2 text-gray-700">
                    Thương hiệu
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={brand}
                          className="text-sm text-gray-700 cursor-pointer select-none"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* === DANH SÁCH SẢN PHẨM === */}
          <main className="md:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h2 className="font-medium text-gray-700 mb-2 sm:mb-0">
                Tìm thấy{" "}
                <span className="font-bold text-blue-600">
                  {filteredProducts.length}
                </span>{" "}
                sản phẩm
              </h2>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Sắp xếp theo:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSortChange("asc")}
                    className={`px-3 py-1.5 text-sm rounded border transition-colors ${
                      sortOption === "asc"
                        ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Giá tăng dần
                  </button>
                  <button
                    onClick={() => handleSortChange("desc")}
                    className={`px-3 py-1.5 text-sm rounded border transition-colors ${
                      sortOption === "desc"
                        ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Giá giảm dần
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20 text-gray-500">
                Đang tải dữ liệu...
              </div>
            ) : visibleProducts.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg">
                  Không tìm thấy sản phẩm nào phù hợp.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-2 text-blue-600 hover:underline"
                >
                  Xóa bộ lọc để xem tất cả
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {visibleProducts.map((product) => (
                    <Product
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      image={`${BASE_IMAGE_URL}${product.imageUrl}`}
                      originalPrice={product.originalPrice}
                      price={product.price}
                      unit={product.unit}
                    />
                  ))}
                </div>

                {visibleCount < sortedProducts.length && (
                  <div className="text-center mt-10">
                    <button
                      onClick={handleShowMore}
                      className="px-6 py-2 border border-blue-600 text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-colors"
                    >
                      Xem thêm {sortedProducts.length - visibleCount} sản phẩm
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
