export const createEventTypeModel = (eventType) => ({
  description: eventType.description,
  type: eventType.type,
  category: eventType.category || 'Social',
  status: eventType.status || 'Activo',
});