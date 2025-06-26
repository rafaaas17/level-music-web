export const createServiceTypeModel = (serviceType) => ({
  name: serviceType.name,
  description: serviceType.description,
  status: serviceType.status || 'Activo',
  attributes: serviceType.attributes.map(attr => ({
    name: attr.name,
    type: attr.type,
    required: attr.required,
  })),
});