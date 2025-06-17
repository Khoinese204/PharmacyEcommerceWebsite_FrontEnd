export function calculateCartSummary(
  selectedItems: number[],
  cart: any[],
  voucherDiscount: number,
  shippingDiscount: number = 0 // ✅ thêm mặc định nếu chưa có
) {
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
