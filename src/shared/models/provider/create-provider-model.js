export const createProviderModel = (provider) => ({
  name: provider.name,
  contact_name: provider.contact_name,
  phone: provider.phone,
  email: provider.email,
  status: provider.status || 'Activo',
});