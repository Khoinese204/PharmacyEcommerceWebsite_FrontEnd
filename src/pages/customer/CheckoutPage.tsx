// src/pages/customer/CheckoutPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BreadcrumbBack from "../../components/common/BreadcrumbBack";
import locations from "../../assets/locations.json";
import { useCart } from "./CartContext";
import { calculateCartSummary } from "../../utils/calculateCartSummary";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [voucher, setVoucher] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [specificAddress, setSpecificAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [error, setError] = useState("");

  const breadcrumbItems = [{ label: "Quay lại giỏ hàng", path: "/cart" }];

  const cityList = locations.map((c) => c.name);
  const districtList =
    locations.find((c) => c.name === selectedCity)?.districts || [];
  const wardList =
    districtList.find((d) => d.name === selectedDistrict)?.wards || [];

  const voucherDiscount = 0;
  const summary = calculateCartSummary(selectedItems, cart, voucherDiscount);

  useEffect(() => {
    if (location.state?.selectedItems) {
      setSelectedItems(location.state.selectedItems);
      localStorage.setItem(
        "selectedItems",
        JSON.stringify(location.state.selectedItems)
      );
    } else {
      const saved = localStorage.getItem("selectedItems");
      if (saved) {
        setSelectedItems(JSON.parse(saved));
      }
    }
  }, [location.state]);

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

    setError("");

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
      <BreadcrumbBack items={breadcrumbItems} />

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form thông tin khách hàng */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Thông tin đặt hàng</h2>
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

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
              <option value="">Chọn tỉnh/thành phố *</option>
              {cityList.map((city) => (
                <option key={city}>{city}</option>
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
            rows={3}
            placeholder="Ghi chú (không bắt buộc)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <label className="text-sm inline-flex items-center gap-2">
            <input type="checkbox" /> Yêu cầu xuất hóa đơn điện tử?
          </label>
        </div>

        {/* Thông tin đơn hàng */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Áp dụng ưu đãi</h2>
          <div className="flex gap-2">
            <input
              className="input flex-1"
              placeholder="Nhập mã giảm giá"
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
            />
            <button className="bg-cyan-400 text-white px-4 py-2 rounded text-sm">
              Áp dụng
            </button>
          </div>

          <h2 className="text-left text-lg font-semibold">Đơn hàng</h2>
          <div className="border-t pt-4 space-y-2 text-sm">
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
              <span>{summary.voucherDiscount.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển</span>
              <span>
                {summary.shippingFee === 0
                  ? "Miễn phí"
                  : `${summary.shippingFee.toLocaleString()}đ`}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Thành tiền</span>
              <span className="text-blue-600">
                {summary.finalTotal.toLocaleString()}đ
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-left text-sm font-medium">
              Chọn phương thức thanh toán
            </p>
            <div className="flex flex-col gap-2 pl-2 text-sm">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Thanh toán tiền mặt
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Chuyển khoản (QR Code)
              </label>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-cyan-400 text-white py-2 rounded font-semibold"
          >
            ĐẶT HÀNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
