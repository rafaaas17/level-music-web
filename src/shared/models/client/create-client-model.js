export const createClientModel = (uid, client) => ({
  auth_id: uid,
  first_name: client.first_name,
  last_name: client.last_name,
  phone: client.phone,
  email: client.email,
  document_type: client.document_type,
  document_number: client.document_number,
  role: "Cliente",
  status: "Activo",
  needs_password_change: true,
  created_by_admin: true
});