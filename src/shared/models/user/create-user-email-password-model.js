export const createUserEmailPasswordModel = (user, role, extraFields = {}) => ({
  auth_id: user.uid,
  email: user.providerData[0].email,
  first_name: null,
  last_name: null,
  phone: null,
  document_type: null,
  document_number: null,
  role,
  status: "Activo",
  profile_picture: null,
  ...extraFields,
});
