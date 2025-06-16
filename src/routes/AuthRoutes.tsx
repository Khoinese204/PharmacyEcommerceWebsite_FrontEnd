import { Route, Routes } from "react-router-dom";
import LoginForm from "../pages/common/LoginForm";
import SignUpForm from "../pages/common/SignUpForm";
import SignUpSuccessPage from "../pages/common/SignUpSuccessPage";
import ForgotPasswordPage from "../pages/common/ForgotPasswordPage";
import ResetPasswordSuccessPage from "../pages/common/ResetPasswordSuccessPage";
import AuthPage from "../pages/common/AuthPage";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="" element={<AuthPage />} />
      <Route path="signupsuccess" element={<SignUpSuccessPage />} />
      <Route path="forgotpassword" element={<ForgotPasswordPage />} />
      <Route
        path="resetpasswordsuccess"
        element={<ResetPasswordSuccessPage />}
      />
    </Routes>
  );
}
