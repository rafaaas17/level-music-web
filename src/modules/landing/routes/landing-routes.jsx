import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage, RequestPage, EventsPage } from "../pages";

export const LandingRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/eventos" element={<EventsPage />} />
      <Route path="/solicitar-evento" element={<RequestPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
