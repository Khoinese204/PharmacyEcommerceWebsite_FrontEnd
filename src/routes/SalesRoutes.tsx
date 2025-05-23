import { Route, Routes } from "react-router-dom";
import SalesLayout from "../components/layouts/SalesLayout";
import HomePage from "../pages/customer/HomePage";
import OrderHistoryPage from "../pages/customer/OrderHistoryPage";

export default function CustomerRoutes() {
  return (
    <SalesLayout>
      <Routes></Routes>
    </SalesLayout>
  );
}
