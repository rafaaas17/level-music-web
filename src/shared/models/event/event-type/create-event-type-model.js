export const createEventTypeModel = (eventType) => ({
  description: eventType.description,
  type: eventType.type,
  category: eventType.category,
  status: eventType.status,
});