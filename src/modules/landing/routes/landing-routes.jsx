import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage, ContactPage, EventsPage } from "../pages";

export const LandingRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/eventos" element={<EventsPage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
