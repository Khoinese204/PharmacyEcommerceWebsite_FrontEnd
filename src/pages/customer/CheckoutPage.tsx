import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BreadcrumbBack from "../../components/common/BreadcrumbBack";
import locations from "../../assets/locations.json";
import { useCart } from "./CartContext";
import { calculateCartSummary } from "../../utils/calculateCartSummary";
import { toast } from "react-toastify";

type ApplyPromotionResponse = {
  success: boolean;
  discountAmount: number;
  message: string;
};

type Promotion = {
  id: number;
  name: string;
  description: string;
  discountPercent: number;
  applicableCategoryId: number | null;
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [appliedPromotions, setAppliedPromotions] = useState<number[]>([]);
  const [voucherDiscount, setVoucherDiscount] = useState(0);

  const [shippingPromotions, setShippingPromotions] = useState<Promotion[]>([]);
  const [appliedShippingPromo, setAppliedShippingPromo] = useState<
    number | null
  >(null);
  const [shippingDiscount, setShippingDiscount] = useState(0);
  const [showShippingPromoList, setShowShippingPromoList] = useState(false);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [voucher, setVoucher] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [specificAddress, setSpecificAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");

  const cityList = locations.map((c) => c.name);
  const districtList =
    locations.find((c) => c.name === selectedCity)?.districts || [];
  const wardList =
    districtList.find((d) => d.name === selectedDistrict)?.wards || [];

  const summary = calculateCartSummary(
    selectedItems,
    cart,
    voucherDiscount,
    shippingDiscount
  );

  useEffect(() => {
    if (location.state?.selectedItems) {
      setSelectedItems(location.state.selectedItems);
      localStorage.setItem(
        "selectedItems",
        JSON.stringify(location.state.selectedItems)
      );
    } else {
      const saved = localStorage.getItem("selectedItems");
      if (saved) setSelectedItems(JSON.parse(saved));
    }

    if (location.state?.appliedPromotions) {
      setAppliedPromotions(location.state.appliedPromotions);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchDiscountTotal = async () => {
      let total = 0;
      for (const promoId of appliedPromotions) {
        try {
          const res = await fetch("/api/promotions/apply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              promotionId: promoId,
              selectedItems: cart
                .filter((item) => selectedItems.includes(item.id))
                .map((i) => ({
                  id: i.id,
                  quantity: i.quantity,
                })),
            }),
          });
          const json: ApplyPromotionResponse = await res.json();
          if (json.success) total += json.discountAmount;
        } catch {
          console.error("Lỗi khi lấy giảm giá");
        }
      }
      setVoucherDiscount(total);
    };

    if (selectedItems.length > 0 && appliedPromotions.length > 0) {
      fetchDiscountTotal();
    }
  }, [appliedPromotions, selectedItems, cart]);

  const fetchShippingPromotions = async () => {
    try {
      const res = await fetch("/api/promotions");
      const list: Promotion[] = await res.json();
      const shippingPromos = list.filter((p) =>
        p.name.toLowerCase().includes("vanchuyen")
      );
      setShippingPromotions(shippingPromos);
      setShowShippingPromoList(true);
    } catch {
      toast.error("Không thể tải danh sách mã vận chuyển");
    }
  };

  const applyShippingPromotion = async (promo: Promotion) => {
    if (appliedShippingPromo === promo.id) {
      setAppliedShippingPromo(null);
      setShippingDiscount(0);
      toast.info("Đã bỏ áp dụng mã vận chuyển");
      return;
    }

    try {
      const res = await fetch("/api/promotions/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          promotionId: promo.id,
          selectedItems: cart
            .filter((item) => selectedItems.includes(item.id))
            .map((i) => ({
              id: i.id,
              quantity: i.quantity,
            })),
        }),
      });

      const json: ApplyPromotionResponse = await res.json();
      if (json.success) {
        setAppliedShippingPromo(promo.id);
        setShippingDiscount(json.discountAmount);
        toast.success("Áp dụng mã vận chuyển thành công");
      } else {
        toast.warning(json.message);
      }
    } catch {
      toast.error("Lỗi khi áp dụng mã vận chuyển");
    }
  };

  const handlePlaceOrder = () => {
    if (
      !paymentMethod ||
      !customerName.trim() ||
      !customerPhone.trim() ||
      !selectedCity ||
      !selectedDistrict ||
      !selectedWard ||
      !specificAddress.trim()
    ) {
      setError(
        "Vui lòng điền đầy đủ thông tin hợp lệ và chọn phương thức thanh toán."
      );
      return;
    }

    const orderId = "DH" + Math.floor(Math.random() * 1000000);
    const orderDate = new Date().toLocaleString("vi-VN");
    const fullAddress = `${specificAddress}, ${selectedWard}, ${selectedDistrict}, ${selectedCity}`;
    const expectedDate = "thứ 7 (3/5/2025)";

    const newOrder = {
      id: orderId,
      name: customerName,
      phone: customerPhone,
      address: fullAddress,
      total: summary.finalTotal,
      date: orderDate,
      status: "processing",
      paymentMethod,
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem(
      "orders",
      JSON.stringify([newOrder, ...existingOrders])
    );

    navigate("/ordersuccess", {
      state: {
        orderId,
        name: customerName,
        phone: customerPhone,
        address: fullAddress,
        total: summary.finalTotal,
        paymentMethod,
        expectedDate,
      },
    });
  };

  return (
    <div className="bg-white text-gray-800">
      <BreadcrumbBack items={[{ label: "Quay lại giỏ hàng", path: "/cart" }]} />

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Thông tin khách hàng */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Thông tin đặt hàng</h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            className="input"
            placeholder="Họ và tên *"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <input
            className="input"
            placeholder="Số điện thoại *"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
          />

          {/* Địa chỉ */}
          <div className="flex gap-4">
            <select
              className="input"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedDistrict("");
                setSelectedWard("");
              }}
            >
              <option value="">Chọn tỉnh/thành *</option>
              {cityList.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select
              className="input"
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedWard("");
              }}
            >
              <option value="">Chọn quận/huyện *</option>
              {districtList.map((d) => (
                <option key={d.name}>{d.name}</option>
              ))}
            </select>
            <select
              className="input"
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
            >
              <option value="">Chọn phường/xã *</option>
              {wardList.map((w) => (
                <option key={w}>{w}</option>
              ))}
            </select>
          </div>

          <input
            className="input"
            placeholder="Địa chỉ cụ thể *"
            value={specificAddress}
            onChange={(e) => setSpecificAddress(e.target.value)}
          />
          <textarea
            className="input"
            placeholder="Ghi chú (không bắt buộc)"
            value={note}
            rows={3}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Thông tin đơn hàng */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Áp dụng ưu đãi vận chuyển</h3>
            <button
              onClick={fetchShippingPromotions}
              className="bg-cyan-400 text-white px-4 py-2 rounded text-sm"
            >
              Chọn mã giảm giá
            </button>
          </div>

          <h2 className="text-lg font-semibold">Đơn hàng</h2>
          <div className="border-t pt-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span>Tổng tiền</span>
              <span>{summary.totalOriginal.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Giảm giá trực tiếp</span>
              <span>-{summary.totalDiscount.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between">
              <span>Giảm giá voucher</span>
              <span>-{summary.voucherDiscount.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between">
              <span>Giảm giá vận chuyển</span>
              <span>-{shippingDiscount.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between font-bold text-blue-600 text-lg">
              <span>Thành tiền</span>
              <span>{summary.finalTotal.toLocaleString()}đ</span>
            </div>
          </div>

          <div>
            <p className="text-sm mb-2">Chọn phương thức thanh toán</p>
            <div className="flex flex-col gap-2 pl-2 text-sm">
              <label>
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />{" "}
                Thanh toán tiền mặt
              </label>
              <label>
                <input
                  type="radio"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />{" "}
                Chuyển khoản
              </label>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded font-semibold"
          >
            ĐẶT HÀNG
          </button>
        </div>
      </div>

      {/* Modal chọn mã vận chuyển */}
      {showShippingPromoList && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-10">
            <h3 className="text-lg font-semibold mb-4">Chọn mã vận chuyển</h3>
            <ul className="space-y-2 max-h-80 overflow-auto">
              {shippingPromotions.map((promo) => (
                <li key={promo.id}>
                  <button
                    onClick={() => applyShippingPromotion(promo)}
                    className={`w-full text-left px-4 py-2 rounded ${
                      appliedShippingPromo === promo.id
                        ? "bg-gray-300 text-gray-500"
                        : "hover:bg-cyan-100"
                    }`}
                  >
                    <p className="font-medium">{promo.name}</p>
                    <p className="text-xs text-gray-600">{promo.description}</p>
                  </button>
                </li>
              ))}
              {shippingPromotions.length === 0 && <li>Không có mã nào</li>}
            </ul>
            <div className="text-right mt-4">
              <button
                onClick={() => setShowShippingPromoList(false)}
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
};

export default CheckoutPage;
