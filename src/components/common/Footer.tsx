export default function Footer() {
  /* Footer */
  return (
    <footer className="bg-gray-100 py-8 mt-8 text-sm text-gray-700">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        <div>
          <h4 className="font-semibold mb-2">PrimeCare</h4>
          <p>Địa chỉ: 280 Phan Xích Long, Phú Nhuận, TP.HCM</p>
          <p>Hotline: 1800 1234 789</p>
          <p>Email: support@primecare.com.vn</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Danh mục</h4>
          <ul>
            <li>Trang chủ</li>
            <li>Sản phẩm</li>
            <li>Về chúng tôi</li>
            <li>Liên hệ</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Hỗ trợ khách hàng</h4>
          <ul>
            <li>Hướng dẫn mua hàng</li>
            <li>Chính sách giao hàng</li>
            <li>Chính sách đổi/trả thuốc</li>
            <li>Chính sách bảo mật</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Đăng ký nhận tin</h4>
          <input
            type="email"
            placeholder="Nhập email của bạn"
            className="border rounded w-full px-2 py-1 text-sm mb-2"
          />
          <button className="w-full bg-cyan-500 text-white py-1 rounded hover:bg-cyan-600">
            Đăng ký
          </button>
        </div>
      </div>
      <div className="text-center mt-6 text-xs text-gray-500">
        2025 PrimeCare. All rights reserved • Số giấy phép kinh doanh:
        0319876543
      </div>
    </footer>
  );
}
