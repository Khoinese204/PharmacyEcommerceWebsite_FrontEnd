import { useState } from "react";

interface QuantityButtonProps {
  enabled: boolean;
}

export default function QuantityButton({ enabled }: QuantityButtonProps) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    if (!enabled) return;
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (!enabled) return;
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center justify-center h-6 rounded-full bg-gray-100 px-2">
      <button
        onClick={handleDecrease}
        className={`text-xs w-5 h-5 flex items-center justify-center rounded ${
          enabled
            ? "text-gray-700 hover:text-black"
            : "text-gray-300 cursor-not-allowed"
        }`}
        disabled={!enabled}
      >
        −
      </button>
      <span
        className={`mx-2 text-xs ${
          enabled ? "text-gray-900" : "text-gray-400"
        }`}
      >
        {quantity}
      </span>
      <button
        onClick={handleIncrease}
        className={`text-xs w-5 h-5 flex items-center justify-center rounded ${
          enabled
            ? "text-gray-700 hover:text-black"
            : "text-gray-300 cursor-not-allowed"
        }`}
        disabled={!enabled}
      >
        +
      </button>
    </div>
  );
}
