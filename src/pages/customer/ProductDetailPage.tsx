import React from "react";

const ProductDetailPage = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Breadcrumb */}
      <div className="bg-cyan-100 text-sm py-3 px-4">
        <div className="max-w-6xl mx-auto text-left">
          <span className="text-gray-700">Trang chủ</span> &gt;{" "}
          <span className="text-gray-700">Chăm sóc cá nhân</span> &gt;{" "}
          <span className="font-medium">Nước súc miệng</span>
        </div>
      </div>

      {/* Top info */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img
            src="/product-mouthwash.jpg"
            alt="Nước súc miệng"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        <div>
          <h1
            style={{ fontSize: "30px" }}
            className="font-semibold mb-2 leading-snug text-left"
          >
            Nước súc miệng Pearlie White Fluorinze Anti-bacterial Fluoride 750ml
            chống lại vi khuẩn gây mảng bám sâu răng
          </h1>
          <div className="text-left mb-4">
            <span className="line-through text-gray-400 text-sm mr-2">
              168.000đ
            </span>
            <span className="text-blue-600 font-bold text-lg">
              132.000đ/chai
            </span>
          </div>
          <div className="text-left">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-1 w-fit text-sm">
              <button className="px-2 text-sm text-gray-700 hover:text-black">
                −
              </button>
              <span className="mx-2 text-gray-900">1</span>
              <button className="px-2 text-sm text-gray-700 hover:text-black">
                +
              </button>
            </div>
          </div>

          <table className="text-left text-sm">
            <tbody>
              <tr>
                <td className="pr-4 py-1">Chọn đơn vị tính:</td>
                <td>Chai</td>
              </tr>
              <tr>
                <td className="pr-4 py-1">Danh mục:</td>
                <td>Nước súc miệng</td>
              </tr>
              <tr>
                <td className="pr-4 py-1">Mô tả ngắn:</td>
                <td>
                  Sản phẩm giúp loại bỏ vi khuẩn gây mùi, giữ hơi thở thơm mát
                </td>
              </tr>
              <tr>
                <td className="pr-4 py-1">Xuất xứ:</td>
                <td>Singapore</td>
              </tr>
              <tr>
                <td className="pr-4 py-1">Nhà sản xuất:</td>
                <td>CORLISON</td>
              </tr>
              <tr>
                <td className="pr-4 py-1">Nước sản xuất:</td>
                <td>Singapore</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabs + content */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* Tabs sidebar */}
        <aside className="space-y-3">
          <button className="w-full text-left py-2 px-3 rounded bg-blue-100 font-medium text-blue-700">
            Mô tả sản phẩm
          </button>
          <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-100">
            Thành phần
          </button>
          <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-100">
            Công dụng
          </button>
          <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-100">
            Cách dùng
          </button>
          <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-100">
            Tác dụng phụ
          </button>
          <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-100">
            Lưu ý
          </button>
          <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-100">
            Bảo quản
          </button>
        </aside>

        {/* Main content */}
        <div className="text-left md:col-span-3">
          <h2 className="text-base font-semibold mb-2">Mô tả sản phẩm</h2>
          <p className="mb-4">
            <strong>
              Nước súc miệng Pearlie White Fluorinze Anti-bacterial Fluoride
              750ml
            </strong>{" "}
            giúp loại bỏ vi khuẩn gây mùi và mảng bám, tăng cường men răng và
            giữ hơi thở thơm mát. Sản phẩm thích hợp cho người lớn và trẻ từ 6
            tuổi trở lên.
          </p>

          <p className="mb-4">
            Mảng bám và sâu răng là hai vấn đề răng miệng phổ biến hiện nay. Sản
            phẩm giúp giảm hình thành mảng bám, sạch khoang miệng, giảm vi khuẩn
            gây sâu răng và tạo cảm giác dễ chịu khi sử dụng. Ngoài ra, còn có
            khả năng bảo vệ nướu và hạn chế hơi thở có mùi.
          </p>

          <p className="mb-4">
            Được thiết kế dễ mang đi, mùi dịu nhẹ, công thức CPC và Xylitol hỗ
            trợ kiểm soát mùi hôi miệng và ngừa vi khuẩn hiệu quả.
          </p>

          <p className="mb-4">
            <strong>Hướng dẫn sử dụng:</strong> Súc miệng 10–15ml mỗi lần, giữ
            trong 20–30 giây rồi nhổ ra. Không nuốt. Không dùng cho trẻ dưới 6
            tuổi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
