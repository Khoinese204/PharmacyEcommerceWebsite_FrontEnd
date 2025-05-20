export default function StatusLine() {
  return (
    <div className="text-left bg-yellow-50 border rounded-lg p-4 flex justify-between items-center mt-5">
      {/* Bên trái: Mã đơn hàng và thời gian */}
      <div>
        <p className="text-sm text-black font-semibold">Mã đơn hàng #123456</p>
        <p className="text-xs text-gray-500">
          5 sản phẩm ・ Đơn hàng đã đặt vào 7:32 PM 2/5/2025 ・ Dự kiến giao
          hàng: 7/5/2025
        </p>
      </div>

      {/* Bên phải: Tổng tiền */}
      <p className="text-cyan-500 font-semibold text-base">714.000đ</p>
    </div>
  );
}
