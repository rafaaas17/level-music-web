import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../pages';
import { ChangePasswordPage } from '../pages/change-password-page';

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="change-password" element={<ChangePasswordPage />} />

      <Route path='/*' element={ <Navigate to="/auth/login"/> } />
    </Routes>
  );
}