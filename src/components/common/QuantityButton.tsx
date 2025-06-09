interface QuantityButtonProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  enabled: boolean;
}

export default function QuantityButton({
  quantity,
  onIncrement,
  onDecrement,
  enabled,
}: QuantityButtonProps) {
  return (
    <div className="flex items-center justify-center h-6 rounded-full bg-gray-100 px-2">
      <button
        onClick={onDecrement}
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
        onClick={onIncrement}
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
