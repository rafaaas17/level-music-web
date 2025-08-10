export const updateEventTypeModel = (eventType) => ({
  description: eventType.description,
  type: eventType.type,
  category: eventType.category,
  status: eventType.status,
  attributes: eventType.attributes.map(attr => ({
    name: attr.name,
    description: attr.description,
  })),
});