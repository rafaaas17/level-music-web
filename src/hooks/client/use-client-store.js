import { useDispatch, useSelector } from "react-redux";
import { userApi } from "../../api";
import {
  refreshClients,
  selectedClient,
  setLoadingClient,
  setPageClient,
  setRowsPerPageClient,
  showSnackbar,
} from "../../store";
import { createClientModel, updateClientModel } from "../../shared/models";
import { useState } from "react";

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
      const newClient = createClientModel(client);
      await clientApi.post("/", newClient);
      await startLoadingClientsPaginated();
      dispatch(showSnackbar({
        message: `El cliente fue creado exitosamente.`,
        severity: 'success',
      }));
      return true;
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({
        message: `Ocurrió un error al crear el cliente.`,
        severity: 'error',
      }));
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
      await clientApi.put(`/${id}`, payload);
      await startLoadingClientsPaginated();
      dispatch(showSnackbar({
        message: `El cliente fue actualizado exitosamente.`,
        severity: 'success',
      }));
      return true;
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({
        message: `Ocurrió un error al actualizar el cliente.`,
        severity: 'error',
      }));
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