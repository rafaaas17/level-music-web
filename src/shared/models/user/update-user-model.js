export const updateUserModel = (user) => ({
  email: user.email,
  full_name: null,
  phone: null,
  document_type: null,
  document_number: null,
  status: "Activo",
  profile_picture: null,
});
