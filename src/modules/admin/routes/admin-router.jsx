import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage, EventPage } from '../pages';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="events" element={<EventPage />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
};
