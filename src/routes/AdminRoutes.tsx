import { Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/admin/DashboardPage";
import AdminLayout from "../components/layouts/AdminLayout";

export default function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </AdminLayout>
  );
}
