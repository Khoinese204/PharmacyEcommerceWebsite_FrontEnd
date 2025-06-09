import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuantityButton from "../../components/common/QuantityButton";
import BreadcrumbBack from "../../components/common/BreadcrumbBack";
import { useCart } from "./CartContext";

export default function CartPage() {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 lấy location để theo dõi pathname
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false); // ✅ thêm dòng này
  const { cart, updateQuantity, removeFromCart } = useCart();

  const toggleSelect = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const selectedCart = cart.filter((item) => selectedItems.includes(item.id));
  const totalPrice = selectedCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalOriginal = selectedCart.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const totalDiscount = totalOriginal - totalPrice;

  const breadcrumbItems = [{ label: "Tiếp tục mua sắm", path: "/" }];

  // ✅ Load dữ liệu từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem("selectedItems");
    if (saved) {
      setSelectedItems(JSON.parse(saved));
    }
    setIsLoaded(true); // ✅ chỉ render khi đã load xong
  }, []);

  // ✅ Save lại localStorage mỗi khi selectedItems thay đổi
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    }
  }, [selectedItems, isLoaded]);

  return (
    <div className="bg-white min-h-screen text-gray-800">
      <BreadcrumbBack items={breadcrumbItems} />

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Danh sách sản phẩm trong giỏ */}
        <div className="md:col-span-2 space-y-4 text-left">
          {cart.length === 0 ? (
            <p>Giỏ hàng của bạn đang trống.</p>
          ) : (
            isLoaded &&
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="accent-cyan-600"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                  />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Đơn vị tính: {item.unit}
                    </p>
                    {item.price < item.originalPrice && (
                      <p className="line-through text-gray-400 text-sm">
                        {item.originalPrice.toLocaleString()}đ
                      </p>
                    )}
                    <p className="text-blue-600 font-bold">
                      {item.price.toLocaleString()}đ
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-1 w-fit text-sm">
                    <QuantityButton
                      quantity={item.quantity}
                      enabled={true}
                      onIncrement={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      onDecrement={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    />
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-xl"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Tổng đơn hàng */}
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Áp dụng ưu đãi</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập mã giảm giá"
                className="border px-3 py-2 rounded text-sm w-full"
              />
              <button className="bg-cyan-400 text-white px-4 rounded hover:bg-cyan-500 text-sm">
                ÁP DỤNG
              </button>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-bold mb-2">TỔNG GIỎ HÀNG</h3>
            <div className="flex justify-between text-sm mb-1">
              <span>Tổng tiền</span>
              <span>{totalOriginal.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between text-sm text-orange-500 mb-1">
              <span>Giảm giá trực tiếp</span>
              <span>-{totalDiscount.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Giảm giá voucher</span>
              <span>0đ</span>
            </div>
            <div className="flex justify-between font-semibold text-blue-700">
              <span>Thành tiền</span>
              <span>{totalPrice.toLocaleString()}đ</span>
            </div>
            <button
              onClick={() => {
                if (selectedCart.length === 0) {
                  alert("Vui lòng chọn sản phẩm để tiến hành mua hàng.");
                  return;
                }
                navigate("/checkout", { state: { selectedItems } });
              }}
              disabled={!isLoaded || selectedCart.length === 0}
              className={`w-full mt-4 py-2 rounded font-semibold transition ${
                !isLoaded || selectedCart.length === 0
                  ? "bg-gray-300 text-white cursor-not-allowed"
                  : "bg-cyan-500 text-white hover:bg-cyan-600"
              }`}
            >
              MUA HÀNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
