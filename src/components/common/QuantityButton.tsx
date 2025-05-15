import { useState } from "react";

export default function QuantityButton() {
  const [quantity, setQuantity] = useState(1);
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };
  return (
    <>
      <button
        onClick={handleDecrease}
        className="px-2 text-sm text-gray-700 hover:text-black"
      >
        −
      </button>
      <span className="mx-2 text-gray-900">{quantity}</span>
      <button
        onClick={handleIncrease}
        className="px-2 text-sm text-gray-700 hover:text-black"
      >
        +
      </button>
    </>
  );
}
