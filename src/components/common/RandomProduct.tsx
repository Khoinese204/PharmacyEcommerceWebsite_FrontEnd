import { useNavigate } from "react-router-dom";
import { useCart } from "../../pages/customer/CartContext";
import { toast } from "react-toastify";

type ProductType = {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  price: number;
  unit: string;
};

type ProductProps = {
  products: ProductType[];
};

export default function RandomProduct({ products }: ProductProps) {
  const { addToCart, isInCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => {
        const isDiscounted = product.originalPrice > product.price;

        return (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between h-[360px] text-left hover:shadow-md transition"
          >
            {/* ⛳ Khi click chuyển đến /productId thay vì /categoryPath/productId */}
            <div
              onClick={() => navigate(`/${product.id}`)}
              className="cursor-pointer"
            >
              <div className="relative mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-contain"
                />
                {isDiscounted && (
                  <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-md">
                    Khuyến mãi
                  </span>
                )}
              </div>

              <p className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
                {product.name}
              </p>

              <div className="min-h-[1.25rem]">
                {isDiscounted && (
                  <p className="text-gray-400 text-sm line-through mb-0">
                    {product.originalPrice.toLocaleString()}đ
                  </p>
                )}
              </div>

              <p className="text-blue-700 font-bold text-base mb-2">
                {product.price.toLocaleString()}đ/{product.unit}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isInCart(product.id)) {
                  toast.error("Sản phẩm đã tồn tại trong giỏ hàng!", {
                    position: "top-center",
                  });
                  return;
                }
                addToCart({
                  id: product.id,
                  name: product.name,
                  image: product.image,
                  unit: product.unit,
                  originalPrice: product.originalPrice,
                  price: product.price,
                });
                toast.success("Đã thêm vào giỏ hàng!");
              }}
              className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm py-1 px-4 rounded-full mt-auto"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        );
      })}
    </div>
  );
}
