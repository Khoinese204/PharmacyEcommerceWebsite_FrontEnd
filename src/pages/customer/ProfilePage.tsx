import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BreadcrumbTo from "../../components/common/BreadcrumbTo";
import UserSidebar from "../../components/common/UserSidebar";
import DatePickerWithIcon from "../../components/common/DatePickerWithIcon";
import { toast } from "react-toastify";

const breadcrumbItems = [
  { label: "Cá nhân", path: "/account/profile" },
  { label: "Thông tin hồ sơ", path: "/account/profile" },
];

export default function ProfilePage() {
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : null;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(
    "/images/avatar/avatar-default.jpg"
  );
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8080/api/users/${userId}`)
      .then((res) => {
        const data = res.data;
        setFullName(data.fullName || "");
        setEmail(data.email || "");
        setGender(data.gender || "");
        setAddress(data.address || "");
        setPhoneNumber(data.phoneNumber || "");
        setAvatarUrl(data.avatarUrl || "/images/avatar/avatar-default.jpg");
        setBirthDate(data.birthDate ? new Date(data.birthDate) : null);
      })
      .catch((err) => {
        console.error("Lỗi khi tải thông tin người dùng:", err);
      });
  }, [userId]);

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !userId) return;

    setAvatarFile(file);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await axios.post(
        `http://localhost:8080/api/users/${userId}/avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAvatarUrl(res.data.avatarUrl);
    } catch (err) {
      console.error("Lỗi khi upload ảnh:", err);
    }
  };

  const handleSaveChanges = () => {
    axios
      .put(`http://localhost:8080/api/users/${userId}`, {
        fullName,
        gender,
        birthDate,
        phoneNumber,
        address,
        avatarUrl,
      })
      .then(() => toast.success("Cập nhật thành công"))
      .catch(() => toast.error("Cập nhật thất bại"));
  };

  return (
    <div className="bg-gray-50 min-h-screen text-sm">
      <BreadcrumbTo items={breadcrumbItems} />

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        <UserSidebar activePath="/account/profile" />

        <div className="md:col-span-3">
          <div className="bg-white p-6 rounded-md shadow-sm">
            <h2 className="text-base font-semibold mb-4 text-black">
              THÔNG TIN CÁ NHÂN
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Avatar */}
              <div className="flex flex-col items-center col-span-1">
                <img
                  src={`http://localhost:8080${avatarUrl}`}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border object-cover"
                />
                <label className="mt-3 px-3 py-1 bg-cyan-400 text-white text-sm rounded-md cursor-pointer">
                  Cập nhật ảnh mới
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
                <p className="mt-2 text-xs text-gray-500 text-center">
                  Dung lượng file tối đa 5 MB.
                  <br />
                  Định dạng .JPEG, .PNG
                </p>
              </div>

              {/* Form fields */}
              <div className="text-left text-black col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Họ tên
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Ngày sinh
                  </label>
                  <DatePickerWithIcon
                    value={birthDate}
                    onChange={setBirthDate}
                    placeholder="Ngày sinh"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={email}
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Giới tính
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">Giới tính</option>
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Mật khẩu
                  </label>
                  <div className="flex items-center">
                    <input
                      type="password"
                      value="********"
                      readOnly
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                    <Link
                      to="/account/change-password"
                      className="text-sm text-cyan-500 ml-2 whitespace-nowrap"
                    >
                      Cập nhật
                    </Link>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nhập số nhà, tên đường, tên quận, tỉnh..."
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>

              {/* Save button */}
              <div className="md:col-span-4 flex justify-center mt-6">
                <button
                  className="bg-cyan-400 text-white px-6 py-2 rounded-md font-semibold"
                  onClick={handleSaveChanges}
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
