import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BreadcrumbTo from "../../components/common/BreadcrumbTo";
import Product from "../../components/common/Product";
import { fetchMedicines } from "../../common/api";

const allProducts = [
  {
    id: 1,
    name: "Vitamin C 500mg",
    image: "/images/products/product1.jpg",
    originalPrice: 165000,
    discountedPrice: 165000,
    unit: "hộp",
    brand: "VitaHealth",
  },
  {
    id: 2,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product2.jpg",
    originalPrice: 200000,
    discountedPrice: 180000,
    unit: "lon",
    brand: "Vinamilk",
  },
  {
    id: 3,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product3.jpg",
    originalPrice: 200000,
    discountedPrice: 200000,
    unit: "lon",
    brand: "Vinamilk",
  },
  {
    id: 4,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product4.jpg",
    originalPrice: 200000,
    discountedPrice: 200000,
    unit: "lon",
    brand: "Nutifood",
  },
  {
    id: 5,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product5.jpg",
    originalPrice: 200000,
    discountedPrice: 180000,
    unit: "lon",
    brand: "Nutifood",
  },
  {
    id: 6,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product6.jpg",
    originalPrice: 200000,
    discountedPrice: 180000,
    unit: "lon",
    brand: "TH True Milk",
  },
  {
    id: 7,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product7.jpg",
    originalPrice: 180000,
    discountedPrice: 180000,
    unit: "lon",
    brand: "TH True Milk",
  },
  {
    id: 8,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product8.jpg",
    originalPrice: 200000,
    discountedPrice: 180000,
    unit: "lon",
    brand: "Abbott",
  },
  {
    id: 9,
    name: "Sữa tăng đề kháng extra",
    image: "/images/products/product9.jpg",
    originalPrice: 210000,
    discountedPrice: 190000,
    unit: "lon",
    brand: "Abbott",
  },
  {
    id: 10,
    name: "Sữa tăng đề kháng extra",
    image: "/images/products/product10.jpg",
    originalPrice: 210000,
    discountedPrice: 190000,
    unit: "lon",
    brand: "Nestlé",
  },
  {
    id: 11,
    name: "Sữa tăng đề kháng extra",
    image: "/images/products/product11.jpg",
    originalPrice: 210000,
    discountedPrice: 190000,
    unit: "lon",
    brand: "Nestlé",
  },
];

const PersonalCareProductListPage = () => {
  const [products, setProducts] = useState<ProductDisplay[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchMedicines(3);
      setProducts(result);
    };

    fetchData();
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(8);
  const [priceRange, setPriceRange] = useState<string>("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const sortParam = searchParams.get("sort") as "asc" | "desc" | "" | null;
  const sortOption: "asc" | "desc" | "" = sortParam ?? "";

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

  const brands = Array.from(new Set(products.map((p) => p.brand)));

  // 🧠 Lọc theo giá & thương hiệu
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
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    return matchPrice && matchBrand;
  });

  // 🧠 Sắp xếp sau khi lọc
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "asc") return a.price - b.price;
    if (sortOption === "desc") return b.price - a.price;
    return 0;
  });

  const visibleProducts = sortedProducts.slice(0, visibleCount);

  return (
    <div className="bg-white text-gray-800">
      <BreadcrumbTo
        items={[
          { label: "Trang chủ", path: "/" },
          { label: "Chăm sóc cá nhân", path: "/personal-care" },
        ]}
      />

      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-2">Chăm sóc cá nhân</h1>
        <p className="text-gray-600 text-sm mb-6">
          Các sản phẩm hỗ trợ sức khỏe đa dạng dành cho mọi nhu cầu.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1 hidden md:block text-left">
            <h2 className="font-semibold text-lg mb-4">Bộ lọc</h2>
            <div className="space-y-2">
              <h3 className="font-semibold mb-2">Giá bán</h3>
              {[
                { label: "Dưới 100.000đ", value: "under-100" },
                { label: "100.000đ đến 300.000đ", value: "100-300" },
                { label: "300.000đ đến 500.000đ", value: "300-500" },
                { label: "Trên 500.000đ", value: "above-500" },
              ].map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setPriceRange(value)}
                  className={`w-full border rounded p-2 text-left ${
                    priceRange === value
                      ? "border-blue-500 text-blue-700 font-semibold"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Thương hiệu</h3>
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="accent-cyan-600"
                  />
                  <label htmlFor={brand} className="text-sm">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </aside>

          {/* Product List */}
          <main className="md:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Danh sách sản phẩm</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleReset}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Thiết lập lại
                </button>
                <span className="text-gray-700 font-medium">Sắp xếp theo:</span>
                <button
                  onClick={() => handleSortChange("desc")}
                  className={`px-4 py-1 rounded border ${
                    sortOption === "desc"
                      ? "border-blue-500 text-blue-700 font-semibold"
                      : "border-gray-400 text-gray-600"
                  }`}
                >
                  Giá giảm dần
                </button>
                <button
                  onClick={() => handleSortChange("asc")}
                  className={`px-4 py-1 rounded border ${
                    sortOption === "asc"
                      ? "border-blue-500 text-blue-700 font-semibold"
                      : "border-gray-400 text-gray-600"
                  }`}
                >
                  Giá tăng dần
                </button>
              </div>
            </div>

            <Product products={visibleProducts} categoryPath="personal-care" />

            {visibleCount < sortedProducts.length && (
              <div className="text-center mt-8">
                <button
                  onClick={handleShowMore}
                  className="text-cyan-600 hover:underline font-medium"
                >
                  Xem thêm
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PersonalCareProductListPage;
