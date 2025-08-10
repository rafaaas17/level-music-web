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
import { 
  createClientModel, 
  updateClientModel, 
} from "../../shared/models";
import { getAuthConfig, getAuthConfigWithParams } from "../../shared/utils";
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
  
  const { token } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');

  const openSnackbar = (message) => dispatch(showSnackbar({ message }));

  const startCreateClient = async (client) => {
    dispatch(setLoadingClient(true));
    try {
      const payload = createClientModel(client);
      await userApi.post("/client-admin", payload, getAuthConfig(token));
      await startLoadingClientsPaginated();
      openSnackbar("El cliente fue creado exitosamente.");
      return true;
    } catch (error) {
      const message = error.response?.data?.message;
      openSnackbar(message ?? "Ocurrió un error al registrar el cliente.");
      return false;
    } finally {
      dispatch(setLoadingClient(false));
    }
  };

  const startLoadingClientsPaginated = async () => {
    dispatch(setLoadingClient(true));
    try {
      const limit = rowsPerPage;
      const offset = currentPage * rowsPerPage;
      const { data } = await userApi.get("/customers-paginated", 
        getAuthConfigWithParams(token, {
          limit,
          offset,
          search: searchTerm.trim(),
          sortField: orderBy,
          sortOrder: order,
        })
      );
      dispatch(refreshClients({
        items: data.items,
        total: data.total,
        page: currentPage,
      }));
      return true;
    } catch (error) {
      const message = error.response?.data?.message;
      openSnackbar(message ?? "Ocurrió un error al cargar los clientes.");
      return false;
    } finally {
      dispatch(setLoadingClient(false));
    }
  };

  const startUpdateClient = async (id, client) => {
    dispatch(setLoadingClient(true));
    try {
      const payload = updateClientModel(client);
      await userApi.put(`/${id}`, payload, getAuthConfig(token));
      await startLoadingClientsPaginated();
      openSnackbar("El cliente fue actualizado exitosamente.");
      return true;
    } catch (error) {
      const message = error.response?.data?.message;
      openSnackbar(message ?? "Ocurrió un error al actualizar el cliente.");
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