import Chart from "../../components/admin/Chart"; // Giả sử bạn có một component biểu đồ

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-sm">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r px-4 py-6 space-y-4">
        <div className="font-bold text-lg text-blue-600 mb-6">PrimeCare</div>
        <nav className="space-y-2">
          {[
            "Bảng điều khiển",
            "Người dùng",
            "Thuốc",
            "Danh mục thuốc",
            "Mã giảm giá",
            "Kho",
            "Doanh thu",
            "Khách hàng",
            "Lịch sử giá",
          ].map((item, idx) => (
            <button
              key={idx}
              className={`block w-full text-left px-3 py-2 rounded hover:bg-blue-50 ${
                item === "Danh mục thuốc"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Bảng điều khiển
          </h1>
          <div className="flex items-center gap-2 text-xs">
            <select className="border rounded px-2 py-1">
              <option>Tháng 5</option>
            </select>
            <select className="border rounded px-2 py-1">
              <option>Năm 2025</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { title: "Tổng doanh thu", value: "196.500.000đ" },
            { title: "Tổng số đơn hàng", value: "1.820" },
            { title: "Tổng số khách hàng", value: "1.035" },
            { title: "Tổng số loại sản phẩm tồn kho thấp", value: "5" },
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-500">{item.title}</p>
              <p className="text-xl font-bold text-black">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Doanh thu</h2>
          <Chart />
        </div>
      </main>

      {/* Top Right Profile */}
      <div className="absolute top-4 right-6 flex items-center gap-2 text-sm">
        <img src="/avatar.jpg" alt="Avatar" className="w-8 h-8 rounded-full" />
        <div>
          <p className="font-semibold text-gray-800">Boss</p>
          <p className="text-xs text-gray-500">Admin</p>
        </div>
      </div>
    </div>
  );
}
