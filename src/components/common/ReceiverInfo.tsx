import React from "react";

interface ReceiverInfoProps {
  name: string;
  phone: string;
  address: string;
  note?: string;
}

const ReceiverInfo: React.FC<ReceiverInfoProps> = ({
  name,
  phone,
  address,
  note,
}) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 text-sm shadow-sm w-full max-w-md mx-auto">
      <div className="text-left text-black">
        <h2 className="font-semibold text-base mb-4">Thông tin người nhận</h2>
        <p className="mb-1">Họ và tên: {name}</p>
        <p className="mb-1">Số điện thoại: {phone}</p>
        <p className="mb-1">Địa chỉ: {address}</p>
        {note && <p>Ghi chú: {note}</p>}
      </div>
    </div>
  );
};

export default ReceiverInfo;
