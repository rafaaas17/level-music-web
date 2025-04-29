import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CircProgress } from '../shared/ui/components';

export const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { status, role } = useSelector(state => state.auth);

  if (status === 'checking') {
    return <CircProgress />;
  }

  if (status === 'not-authenticated') {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/not-found" replace />;
  }

  return children;
};
