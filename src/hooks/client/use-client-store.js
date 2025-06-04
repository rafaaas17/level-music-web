import { useDispatch, useSelector } from "react-redux";
import { firebaseAuthApi, mailApi, userApi } from "../../api";
import {
  refreshClients,
  selectedClient,
  setLoadingClient,
  setPageClient,
  setRowsPerPageClient,
  showSnackbar,
} from "../../store";
import { 
  createClientModel, 
  createFirebaseUserModel, 
  createTemporalCredentialsMailModel, 
  updateClientModel, 
  updateFirebaseUserModel
} from "../../shared/models";
import { useState } from "react";
import { generateRandomPassword } from '../../shared/utils';

export const useClientStore = () => {
  const dispatch = useDispatch();
  const {
    clients,
    selected,
    total,
    loading,
    currentPage,
    rowsPerPage,
  } = useSelector((state) => state.client);

  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');

  const startCreateClient = async (client) => {
    dispatch(setLoadingClient(true));
    try {
      const password = generateRandomPassword();
      const newFirebaseUser = createFirebaseUserModel(client, password);
      const { data } = await firebaseAuthApi.post("/", newFirebaseUser);
      const newClient = createClientModel(data.uid, client);
      await userApi.post("/", newClient);
      const credentialsMail = createTemporalCredentialsMailModel(client, password);
      await mailApi.post("send-temporal-credentials", credentialsMail);
      await startLoadingClientsPaginated();
      dispatch(showSnackbar({
        message: `El cliente fue creado exitosamente.`,
        severity: 'success',
      }));
      return true;
    } catch (error) {
      let errorMessage = 'Ocurrió un error al crear el cliente.';
      if (error?.response?.data?.message?.includes('duplicate key error')) {
        errorMessage = 'El correo electrónico ya está registrado.';
      }
      dispatch(showSnackbar({ message: errorMessage, severity: 'error' }));
      return false;
    } finally {
      dispatch(setLoadingClient(false));
    }
  };

  const startLoadingClientsPaginated = async () => {
      dispatch(setLoadingClient(true));
      try {
        const limit  = rowsPerPage;
        const offset = currentPage * rowsPerPage;
        const { data } = await userApi.get('/customers-paginated', {
          params: {
            limit,
            offset,
            search: searchTerm.trim(),
            sortField: orderBy,
            sortOrder: order,
          },
        });
        dispatch(refreshClients({
          items: data.items,
          total: data.total,
          page:  currentPage,
        }));
        return true;
      } catch (error) {
        console.log(error);
        return false;
      } finally {
        dispatch(setLoadingClient(false));
      }
    };

  const startUpdateClient = async (id, client) => {
    dispatch(setLoadingClient(true));
    try {
      const payload = updateClientModel(client);
      await userApi.put(`/${id}`, payload);
      const updatedClient = updateFirebaseUserModel(client);
      await firebaseAuthApi.patch(`/${client.auth_id}`, updatedClient);
      await startLoadingClientsPaginated();
      dispatch(showSnackbar({
        message: `El cliente fue actualizado exitosamente.`,
        severity: 'success',
      }));
      return true;
    } catch (error) {
      let errorMessage = 'Ocurrió un error al actualizar el cliente.';
      if (error?.response?.data?.message?.includes('duplicate key error')) {
        errorMessage = 'El correo electrónico ya está registrado.';
      }
      dispatch(showSnackbar({ message: errorMessage, severity: 'error' }));
      return false;
    } finally {
      dispatch(setLoadingClient(false));
    }
  };

  const setSelectedClient = (client) => {
    dispatch(selectedClient({ ...client }));
  };

  const setPageGlobal = (page) => {
    dispatch(setPageClient(page));
  };

  const setRowsPerPageGlobal = (rows) => {
    dispatch(setRowsPerPageClient(rows));
  };

  return {
    // state
    clients,
    selected,
    total,
    loading,
    searchTerm,
    rowsPerPage,
    currentPage,
    orderBy,
    order,

    // setters
    setSearchTerm,
    setOrderBy,
    setOrder,
    setPageGlobal,
    setRowsPerPageGlobal,

    // actions
    startCreateClient,
    startLoadingClientsPaginated,
    startUpdateClient,
    setSelectedClient,
  };
};