export function calculateCartSummary(
  selectedItems: number[],
  cart: any[],
  voucherDiscount: number,
  shippingDiscount: number = 0 // ✅ thêm mặc định nếu chưa có
) {
  const selectedCart = cart.filter((item) => selectedItems.includes(item.id));

  const totalOriginal = selectedCart.reduce((sum, item) => {
    if (item.originalPrice > item.price) {
      return sum + item.originalPrice * item.quantity;
    }
    return sum + item.price * item.quantity; // Nếu không giảm giá, lấy price luôn
  }, 0);
  const totalPrice = selectedCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ Chỉ tính giảm giá nếu price < originalPrice
  const totalDiscount = selectedCart.reduce((sum, item) => {
    if (item.originalPrice > item.price) {
      return sum + (item.originalPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);

  const finalTotal = Math.max(
    0,
    totalPrice - voucherDiscount - shippingDiscount
  );

  return {
    selectedCart,
    totalOriginal,
    totalPrice,
    totalDiscount,
    voucherDiscount,
    shippingFee: shippingDiscount,
    finalTotal,
  };
}
