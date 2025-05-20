import React, { useRef, useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";

interface DatePickerWithIconProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
}

const DatePickerWithIcon: React.FC<DatePickerWithIconProps> = ({
  value,
  onChange,
  placeholder = "Chọn ngày",
}) => {
  const calendarRef = useRef<any>(null);

  const openCalendar = () => {
    if (calendarRef.current) {
      calendarRef.current.setOpen(true);
    }
  };

  return (
    <div className="relative flex items-center w-full">
      {/* Hiển thị giá trị ngày đã chọn */}
      <input
        type="text"
        readOnly
        value={value ? value.toLocaleDateString("vi-VN") : ""}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
      />

      {/* Nút mở lịch bằng icon */}
      <button
        type="button"
        onClick={openCalendar}
        className="absolute right-3 text-gray-500"
      >
        <FaRegCalendarAlt className="w-5 h-5" />
      </button>

      {/* DatePicker ẩn - dùng để hiện lịch popup */}
      <DatePicker
        selected={value}
        onChange={onChange}
        ref={calendarRef}
        dateFormat="dd/MM/yyyy"
        className="hidden"
      />
    </div>
  );
};

export default DatePickerWithIcon;
