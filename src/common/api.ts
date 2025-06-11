// common/api.ts
import axios from "axios";

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
    image: `/images/products/${item.imageUrl}`, // 👈 Sửa chỗ này
    originalPrice: item.originalPrice,
    discountedPrice: item.price,
    unit: item.unit,
    brand: item.brandOrigin,
  }));
}
