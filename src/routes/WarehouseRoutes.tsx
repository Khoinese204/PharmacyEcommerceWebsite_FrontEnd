import { Navigate, Route, Routes } from "react-router-dom";
import WarehouseLayout from "../components/layouts/WarehouseLayout";
import WarehouseDashboardPage from "../pages/warehouse/WarehouseDashboardPage";
import InventoryPage from "../pages/warehouse/InventoryPage";
import ImportPage from "../pages/warehouse/ImportPage";
import ImportDetailPage from "../pages/warehouse/ImportDetailPage";
import SupplierPage from "../pages/warehouse/SupplierPage";
import ExportPage from "../pages/warehouse/ExportPage";
import AddImportPage from "../pages/warehouse/AddImportPage";
import AccountPage from "../pages/admin/AdminAccountPage";
import WarehouseAccountPage from "../pages/warehouse/WarehouseAccountPage";
import AddSupplierPage from "../pages/warehouse/AddSupplierPage";
import InventoryHistoryPage from "../pages/warehouse/InventoryHistoryPage";
import ShipmentPage from "../pages/warehouse/ShipmentPage";
import InventoryDetailPage from "../pages/warehouse/InventoryDetailPage";
import ExportDetailPage from "../pages/warehouse/ExportDetailPage";
import AddShipmentPage from "../pages/warehouse/AddShipmentPage";

export default function WarehouseRoutes() {
  return (
    // <WarehouseLayout>
    <Routes>
      <Route index element={<Navigate to="dashboard" />} />
      <Route path="/dashboard" element={<WarehouseDashboardPage />} />
      <Route path="/account" element={<WarehouseAccountPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/inventory/:id" element={<InventoryDetailPage />} />
      <Route path="/inventory/history" element={<InventoryHistoryPage />} />
      <Route path="/import" element={<ImportPage />} />
      <Route path="/import/add" element={<AddImportPage />} />
      <Route path="/import/:orderId" element={<ImportDetailPage />} />
      <Route path="/supplier" element={<SupplierPage />} />
      <Route path="/supplier/add" element={<AddSupplierPage />} />
      <Route path="/export" element={<ExportPage />} />
      <Route path="/export/:orderId" element={<ExportDetailPage />} />
      <Route path="/shipment" element={<ShipmentPage />} />
      <Route path="/shipment/add" element={<AddShipmentPage />} />
    </Routes>
    // </WarehouseLayout>
  );
}
