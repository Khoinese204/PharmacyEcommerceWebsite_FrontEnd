import { Routes, Route, Navigate } from "react-router-dom";
import PharmacistChatPage from "../pages/pharmacist/PharmacistChatPage";

export default function PharmacistRoutes() {
  return (
    <Routes>
      <Route path="/support-chat" element={<PharmacistChatPage />} />
    </Routes>
  );
}
