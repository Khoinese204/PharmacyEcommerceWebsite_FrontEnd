import { Navigate, Route, Routes } from "react-router-dom";
import WarehouseLayout from "../components/layouts/WarehouseLayout";
import WarehouseDashboardPage from "../pages/warehouse/WarehouseDashboardPage";
import InventoryPage from "../pages/warehouse/InventoryPage";
import ImportPage from "../pages/warehouse/ImportPage";

export default function WarehouseRoutes() {
  return (
    <WarehouseLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/warehouse/dashboard" />} />
        <Route path="/warehouse/dashboard" element={<WarehouseDashboardPage />} />
        <Route path="/warehouse/inventory" element={<InventoryPage />} />
        <Route path="/warehouse/import" element={<ImportPage />} />
      </Routes>
    </WarehouseLayout>
  );
}
