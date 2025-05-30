export const createTemporalCredentialsMailModel = (client, password) => ({
  to: client.email,
  email: client.email,
  password,
});