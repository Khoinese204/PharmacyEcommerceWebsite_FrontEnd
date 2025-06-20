export function getCategoryNameById(id: number): string {
  switch (id) {
    case 1:
      return "Thuốc";
    case 2:
      return "Thực phẩm chức năng";
    case 3:
      return "Chăm sóc cá nhân";
    default:
      return "Không xác định";
  }
}
