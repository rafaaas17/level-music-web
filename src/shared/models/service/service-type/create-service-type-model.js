export const createServiceTypeModel = (serviceType) => ({
  name: serviceType.name,
  description: serviceType.description,
  status: serviceType.status || 'Activo',
});