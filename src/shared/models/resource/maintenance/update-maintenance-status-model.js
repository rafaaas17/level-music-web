export const updateMaintenanceStatusModel = (maintenance) => ({
  status: maintenance.status,
  reagendation_reason: maintenance.reagendation_reason,
  return_to_available: maintenance.return_to_available || null,
  rescheduled_date: maintenance.rescheduled_date || null
});