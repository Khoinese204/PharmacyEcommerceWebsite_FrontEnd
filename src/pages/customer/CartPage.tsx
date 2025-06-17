import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuantityButton from "../../components/common/QuantityButton";
import BreadcrumbBack from "../../components/common/BreadcrumbBack";
import { useCart } from "./CartContext";
import { toast } from "react-toastify";

type Promotion = {
  id: number;
  name: string;
  description: string;
  discountPercent: number;
  applicableCategoryId: number | null;
};

type ApplyPromotionResponse = {
  success: boolean;
  discountAmount: number;
  message: string;
};

type PromotionType = "order" | "coupon" | "category" | "shipping";

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useCart();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [appliedPromos, setAppliedPromos] = useState<{ [id: number]: number }>(
    {}
  );
  const [showPromoList, setShowPromoList] = useState(false);

  const getPromotionType = (promo: Promotion): PromotionType => {
    if (promo.name.toLowerCase().includes("vanchuyen")) return "shipping";
    if (promo.name.toLowerCase().includes("coupon")) return "coupon";
    if (promo.applicableCategoryId !== null) return "category";
    return "order";
  };

  useEffect(() => {
    const saved = localStorage.getItem("selectedItems");
    if (saved) setSelectedItems(JSON.parse(saved));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    }
  }, [selectedItems, isLoaded]);

  const selectedCart = cart.filter((item) => selectedItems.includes(item.id));
  const totalOriginal = selectedCart.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const totalPrice = selectedCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalDiscount = totalOriginal - totalPrice;
  const totalVoucherDiscount = Object.values(appliedPromos).reduce(
    (a, b) => a + b,
    0
  );
  const finalTotal = Math.max(0, totalPrice - totalVoucherDiscount);

  const toggleSelect = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const openPromoList = async () => {
    if (selectedItems.length === 0) {
      toast.warning("Vui lòng chọn sản phẩm trước khi áp dụng mã");
      return;
    }
    try {
      const res = await fetch("/api/promotions");
      const list: Promotion[] = await res.json();
      setPromotions(list);
      setShowPromoList(true);
    } catch {
      toast.error("Không thể tải danh sách mã");
    }
  };

  const toggleApplyPromo = async (promo: Promotion) => {
    const type = getPromotionType(promo);

    // Nếu mã đang được áp dụng ➜ bỏ
    if (appliedPromos[promo.id]) {
      const updated = { ...appliedPromos };
      delete updated[promo.id];
      setAppliedPromos(updated);
      toast.info("Mã giảm giá này ngưng áp dụng");
      return;
    }

    // Nếu đã có mã cùng loại ➜ bỏ mã cũ
    const sameTypeId = Object.keys(appliedPromos).find((id) => {
      const p = promotions.find((pr) => pr.id === +id);
      return p && getPromotionType(p) === type;
    });
    if (sameTypeId) {
      const updated = { ...appliedPromos };
      delete updated[+sameTypeId];
      setAppliedPromos(updated);
    }

    try {
      const res = await fetch("/api/promotions/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          promotionId: promo.id,
          selectedItems: selectedCart.map((i) => ({
            id: i.id,
            quantity: i.quantity,
          })),
        }),
      });
      const json: ApplyPromotionResponse = await res.json();
      if (json.success) {
        setAppliedPromos((prev) => ({
          ...prev,
          [promo.id]: json.discountAmount,
        }));
        toast.success("Áp dụng mã thành công");
      } else {
        toast.error(json.message);
      }
    } catch {
      toast.error("Lỗi khi áp dụng mã");
    }
  };

  useEffect(() => {
    const revalidatePromos = async () => {
      const entries = Object.entries(appliedPromos);
      for (const [promoId] of entries) {
        try {
          const res = await fetch("/api/promotions/apply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              promotionId: Number(promoId),
              selectedItems: selectedCart.map((i) => ({
                id: i.id,
                quantity: i.quantity,
              })),
            }),
          });
          const json: ApplyPromotionResponse = await res.json();
          if (!json.success) {
            toast.info("Mã giảm giá đã bị ngưng áp dụng");
            const newApplied = { ...appliedPromos };
            delete newApplied[Number(promoId)];
            setAppliedPromos(newApplied);
          }
        } catch (e) {
          console.error("Lỗi kiểm tra lại mã giảm giá", e);
        }
      }
    };
    if (selectedCart.length > 0) revalidatePromos();
  }, [selectedCart]);

  const isShippingPromotion = (name: string) =>
    name.toLowerCase().includes("vanchuyen");

  return (
    <div className="bg-white min-h-screen text-gray-800">
      <BreadcrumbBack items={[{ label: "Tiếp tục mua sắm", path: "/" }]} />

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Cart List */}
        <div className="md:col-span-2 space-y-4 text-left">
          {cart.length === 0 ? (
            <p>Giỏ hàng của bạn đang trống.</p>
          ) : (
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

        {/* Summary */}
        <div className="space-y-6">
          <h3 className="font-semibold mb-2">Áp dụng ưu đãi sản phẩm</h3>
          <button
            onClick={openPromoList}
            className="bg-cyan-400 text-white px-4 py-2 rounded hover:bg-cyan-500 text-sm"
          >
            Chọn mã giảm giá
          </button>

          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Tổng giá gốc</span>
              <span>{totalOriginal.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between text-orange-500">
              <span>Giảm trước</span>
              <span>-{totalDiscount.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between">
              <span>Giảm voucher</span>
              <span>-{totalVoucherDiscount.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between font-bold text-blue-700 text-base">
              <span>Thành tiền</span>
              <span>{finalTotal.toLocaleString()}đ</span>
            </div>
            <button
              onClick={() => {
                if (selectedCart.length === 0) {
                  toast.warning("Chưa chọn sản phẩm để mua");
                  return;
                }
                navigate("/checkout", {
                  state: {
                    selectedItems,
                    appliedPromotions: Object.keys(appliedPromos).map(Number),
                    voucherDiscount: totalVoucherDiscount,
                  },
                });
              }}
              className={`w-full mt-4 py-2 rounded font-semibold transition ${
                selectedCart.length === 0
                  ? "bg-gray-300 text-white cursor-not-allowed"
                  : "bg-cyan-500 text-white hover:bg-cyan-600"
              }`}
              disabled={selectedCart.length === 0}
            >
              MUA HÀNG
            </button>
          </div>
        </div>
      </div>

      {/* Modal chọn mã */}
      {showPromoList && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="relative bg-white w-96 p-6 rounded-lg shadow-xl z-10 pointer-events-auto">
            <h2 className="text-lg font-semibold mb-4">Chọn mã giảm giá</h2>
            <ul className="space-y-2 max-h-80 overflow-auto">
              {promotions
                .filter((p) => !isShippingPromotion(p.name)) // ❌ Ẩn mã vận chuyển
                .map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => toggleApplyPromo(p)}
                      className={`w-full text-left px-4 py-2 rounded ${
                        appliedPromos[p.id]
                          ? "bg-gray-200 text-gray-500"
                          : "hover:bg-cyan-100"
                      }`}
                    >
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs">{p.description}</p>
                    </button>
                  </li>
                ))}
              {promotions.length === 0 && <li>Không có mã nào</li>}
            </ul>
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowPromoList(false)}
                className="text-sm text-gray-600 hover:underline"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
