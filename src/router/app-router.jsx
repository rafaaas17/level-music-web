import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AdminRouter } from '../modules/admin/routes/admin-router';
import { AuthRouter } from '../modules/auth/routes/auth-router';
import { LandingRoutes } from '../modules/landing/routes/landing-routes';
import { useCheckAuth } from '../hooks';

export const AppRouter = () => {
  const status = useCheckAuth();
  const location = useLocation();

  if (status === 'authenticated' && location.pathname === '/') {
    return <Navigate to="/admin" />;
  }

  return (
    <Routes>
      <Route path="/*" element={<LandingRoutes />} />

      {status === 'authenticated' ? (
        <Route path="/admin/*" element={<AdminRouter />} />
      ) : (
        <Route path="/auth/*" element={<AuthRouter />} />
      )}

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
