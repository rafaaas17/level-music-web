import { Navigate, Route, Routes } from 'react-router-dom';
import {
  LoginPage,
  RegisterPage,
  FirstLoginPassword,
  ForgotPasswordPage,
  ResetPasswordPage,
} from "../pages";

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="first-login-password" element={<FirstLoginPassword />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />

      <Route path='/*' element={ <Navigate to="/auth/login"/> } />
    </Routes>
  );
}
