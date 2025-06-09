export type CartItem = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
};

export type CartSummary = {
  totalOriginal: number;
  totalDiscounted: number;
  totalDiscount: number;
  voucherDiscount: number;
  shippingFee: number;
  finalTotal: number;
};

export function calculateCartSummary(
  selectedItems: number[],
  cart: CartItem[],
  voucherDiscount = 0
): CartSummary {
  const selected = cart.filter((item) => selectedItems.includes(item.id));

  const totalOriginal = selected.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );

  const totalDiscounted = selected.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalDiscount = totalOriginal - totalDiscounted;

  const shippingFee = totalDiscounted >= 500000 ? 0 : 30000;

  const finalTotal = totalDiscounted + shippingFee - voucherDiscount;

  return {
    totalOriginal,
    totalDiscounted,
    totalDiscount,
    voucherDiscount,
    shippingFee,
    finalTotal,
  };
}
