import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage, EventPage } from '../pages';

export const AdminRouter = () => {
  return (
    <Routes>
      <Route path="" element={<DashboardPage />} />
      <Route path="events" element={<EventPage />} />

      <Route path='/*' element={ <Navigate to="/admin"/> } />
    </Routes>
  );
}