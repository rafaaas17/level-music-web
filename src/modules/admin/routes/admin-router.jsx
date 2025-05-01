import { Routes, Route, Navigate } from 'react-router-dom';
import { 
  DashboardPage, 
  EventPage,
  EventTypePage,
  EventQuotationsPage,
  WorkerPage,
  WorkerTypePage,
  EquipmentPage,
  EquipmentMaintenancePage,
  StorehousePage,
  ServicesPage,
} from '../pages';
import { AdminLayout } from '../layout/admin-layout';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        {/* Dashboard */}
        <Route path="/" element={<DashboardPage />} />

        {/* Eventos */}
        <Route path="events" element={<EventPage />} />
        <Route path="event-types" element={<EventTypePage />} />
        <Route path="quotes" element={<EventQuotationsPage />} />

        {/* Trabajadores */}
        <Route path="workers" element={<WorkerPage />} />
        <Route path="worker-types" element={<WorkerTypePage />} />

        {/* Equipos */}
        <Route path="equipment" element={<EquipmentPage />} />
        <Route path="equipment-maintenance" element={<EquipmentMaintenancePage />} />

        {/* Almacén */}
        <Route path="storehouse" element={<StorehousePage />} />

        {/* Servicios */}
        <Route path="services" element={<ServicesPage />} />

        {/* Rutas no encontradas */}
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Route>
    </Routes>
  );
};
