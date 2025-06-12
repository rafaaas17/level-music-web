export const createMaintenanceModel = (maintenance) => ({
  type: maintenance.type,
  description: maintenance.description,
  resource: maintenance.resource,
  date: maintenance.date,
});