import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage, EventsPage, RequestPage } from '../pages';

export const LandingRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="eventos" element={<EventsPage />} />
      <Route path="solicitar-cotizacion" element={<RequestPage />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
};
