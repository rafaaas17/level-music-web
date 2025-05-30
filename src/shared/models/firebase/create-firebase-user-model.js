export const createFirebaseUserModel = (client, password) => ({
  email: client.email,
  password,
});