export const updateServiceModel = (service) => ({
  provider_name: service.provider_name,
  service_type_name: service.service_type_name,
  status: service.status || 'Activo',
  provider_id: service.provider_id,
  service_type_id: service.service_type_id,
});