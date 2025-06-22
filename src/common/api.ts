// common/api.ts
import axios from "axios";
import { BASE_IMAGE_URL } from "../helper/constants";

export async function fetchMedicines(categoryId: number) {
  const response = await axios.get("/api/medicines");
  console.log("🧪 API response:", response.data);
  const rawData = response.data;

  const filteredData = rawData.filter(
    (item: any) => item.categoryId === categoryId
  );

  return filteredData.map((item: any) => ({
    id: item.id,
    name: item.name,
    image: `${BASE_IMAGE_URL}${item.imageUrl}`, // 👈 Sửa chỗ này
    originalPrice: item.originalPrice,
    price: item.price,
    unit: item.unit,
    brand: item.brandOrigin,
  }));
}

export const fetchMedicineById = async (id: number) => {
  const response = await axios.get(`/api/medicines/${id}`);
  console.log("🧪 Medicine detail:", response.data);
  return response.data; // ✅ FIXED
};

export const fetchInventoryQuantity = async (
  medicineId: number
): Promise<number> => {
  const res = await fetch(`/api/inventory/quantity/${medicineId}`);
  if (!res.ok) throw new Error("Không thể lấy tồn kho");
  return res.json();
};
