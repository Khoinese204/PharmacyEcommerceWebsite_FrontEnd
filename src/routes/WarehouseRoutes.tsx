import { Navigate, Route, Routes } from "react-router-dom";
import WarehouseLayout from "../components/layouts/WarehouseLayout";
import WarehouseDashboardPage from "../pages/warehouse/WarehouseDashboardPage";
import InventoryPage from "../pages/warehouse/InventoryPage";
import ImportPage from "../pages/warehouse/ImportPage";
import ImportDetailPage from "../pages/warehouse/ImportDetailPage";
import SupplierPage from "../pages/warehouse/SupplierPage";
import ExportPage from "../pages/warehouse/ExportPage";
import AddImportPage from "../pages/warehouse/AddImportPage";
import AddSupplierPage from "../pages/warehouse/AddSupplierPage";

export default function WarehouseRoutes() {
  return (
    <WarehouseLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/warehouse/dashboard" />} />
        <Route path="/warehouse/dashboard" element={<WarehouseDashboardPage />} />
        <Route path="/warehouse/inventory" element={<InventoryPage />} />
        <Route path="/warehouse/import" element={<ImportPage />} />
        <Route path="/warehouse/import/add" element={<AddImportPage />} />
        <Route path="/warehouse/import/:orderId" element={<ImportDetailPage />} />
        <Route path="/warehouse/supplier" element={<SupplierPage />} />
        <Route path="/warehouse/supplier/add" element={<AddSupplierPage />} />
        <Route path="/warehouse/export" element={<ExportPage />} />
      </Routes>
    </WarehouseLayout>
  );
}
