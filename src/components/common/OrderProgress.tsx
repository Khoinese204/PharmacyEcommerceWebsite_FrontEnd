import { JSX } from "react";
import {
  FaClipboardList,
  FaBoxOpen,
  FaTruck,
  FaHandshake,
} from "react-icons/fa";

interface Step {
  label: string;
  icon: JSX.Element;
}

interface OrderProgressProps {
  currentStep: number;
}

const steps: Step[] = [
  { label: "Chờ xác nhận", icon: <FaClipboardList className="text-green-500 text-xl mx-auto" /> },
  { label: "Đang đóng gói", icon: <FaBoxOpen className="text-orange-500 text-xl mx-auto" /> },
  { label: "Đang giao hàng", icon: <FaTruck className="text-orange-300 text-xl mx-auto" /> },
  { label: "Đã giao hàng", icon: <FaHandshake className="text-orange-300 text-xl mx-auto" /> },
];

export default function OrderProgress({ currentStep }: OrderProgressProps) {
  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="relative mb-8">
        <div className="flex justify-between items-center mb-6">
          {steps.map((_, index) => (
            <div key={index} className="relative flex-1 flex justify-center">
              {/* Line segment */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-2 left-1/2 h-1 w-full ${
                    index < currentStep ? "bg-orange-500" : "bg-orange-100"
                  }`}
                ></div>
              )}
              {/* Step dot */}
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 ${
                  index <= currentStep
                    ? "border-orange-500 bg-white"
                    : "border-orange-300 bg-white"
                }`}
              >
                {index === 0 && (
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Step icon + label */}
        <div className="flex justify-between text-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center w-28">
              {step.icon}
              <span
                className={`mt-1 text-sm ${
                  index === currentStep
                    ? "font-semibold text-black"
                    : index < currentStep
                    ? "text-gray-800"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}