import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthRouter } from '../modules/auth/routes/auth-router';
import { ClientRoutes } from '../modules/client/routes/client-routes';
import { LandingRoutes } from '../modules/landing/routes/landing-routes'; 
import { AdminRoutes } from '../modules/admin/routes/admin-router';
import { useSelector } from 'react-redux';
import { useCheckAuth, usePersistRoute } from '../hooks';
import { CircProgress } from '../shared/ui/components';
import { NotFoundView } from '../shared/ui/layout/not-found';
import { PrivateRoute } from './private-routes'; 

export const AppRouter = () => {
  const location = useLocation();
  const { status } = useCheckAuth();
  const { role } = useSelector((state) => state.auth);

  usePersistRoute();

  const lastRoute = sessionStorage.getItem('lastRoute') || '/';

  if (status === 'checking') {
    return <CircProgress />;
  }

  if (status === 'authenticated' && location.pathname.startsWith('/auth')) {
    const isAdminRoute = lastRoute.startsWith('/admin');
    const isClientRoute = lastRoute.startsWith('/cliente');
  
    if (role === 'Administrador' && isAdminRoute) {
      return <Navigate to={lastRoute} replace />;
    }
  
    if (role === 'Cliente' && isClientRoute) {
      return <Navigate to={lastRoute} replace />;
    }
  
    const dashboardPath = role === 'Administrador' ? '/admin' : '/cliente';
    return <Navigate to={dashboardPath} replace />;
  }

  if (status === 'authenticated' && location.pathname === '/') {
    const dashboardPath = role === 'Administrador' ? '/admin' : '/cliente';
    return <Navigate to={dashboardPath} replace />;
  }

  return (
    <Routes>
      {/* Rutas del Landing */}
      <Route path="/*" element={<LandingRoutes />} />

      {/* Rutas de Autenticación */}
      <Route path="/auth/*" element={<AuthRouter />} />

      {/* Rutas de Admin protegidas */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute allowedRoles={['Administrador']}>
            <AdminRoutes />
          </PrivateRoute>
        }
      />

      {/* Rutas de Cliente protegidas */}
      <Route
        path="/cliente/*"
        element={
          <PrivateRoute allowedRoles={['Cliente']}>
            <ClientRoutes />
          </PrivateRoute>
        }
      />

      {/* Redireccion a rutas no existentes */}
      <Route path="/not-found" element={<NotFoundView />} />

      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
};
