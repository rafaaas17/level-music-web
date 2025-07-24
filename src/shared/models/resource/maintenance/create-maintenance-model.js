export const createMaintenanceModel = (maintenance) => ({
  type: maintenance.type,
  description: maintenance.description,
  resource_id: maintenance.resource_id,
  date: maintenance.date,
});