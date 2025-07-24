export const updateResourceModel = (resource) => ({
  name: resource.name,
  description: resource.description,
  resource_type: resource.resource_type,
  last_maintenance_date: resource.last_maintenance_date || null,
  maintenance_interval_days: resource.maintenance_interval_days,
});