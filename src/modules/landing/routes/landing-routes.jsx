import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage, ClientsPage, ContactPage } from "../pages";

export const LandingRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/clientes" element={<ClientsPage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
