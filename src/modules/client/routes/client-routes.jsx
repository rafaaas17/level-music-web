import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage, EventsPage, QuotationsPage } from "../pages";

export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="events" element={<EventsPage />} />
      <Route path="quotations" element={<QuotationsPage />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
};