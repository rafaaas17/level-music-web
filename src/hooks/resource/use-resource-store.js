import { useDispatch, useSelector } from "react-redux";
import { createResourceModel, updateResourceModel } from "../../shared/models";
import {
  refreshResource,
  selectedResource,
  setLoadingResource,
  setPageResource,
  setRowsPerPageResource,
  showSnackbar,
} from "../../store";
import { useState } from "react";
import { resourceApi } from "../../api";
import { getAuthConfig, getAuthConfigWithParams } from "../../shared/utils";

export const useResourceStore = () => {
  const dispatch = useDispatch();
  const {
    resources,
    selected,
    total,
    loading,
    currentPage,
    rowsPerPage,
  } = useSelector((state) => state.resource);

  const { token } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");
  
  const openSnackbar = (message) => dispatch(showSnackbar({ message }));

  const startCreateResource = async (resource) => {
    dispatch(setLoadingResource(true));
    try {
      const payload = createResourceModel(resource);
      await resourceApi.post("/", payload, getAuthConfig(token));
      await startLoadingResourcesPaginated();
      openSnackbar("El recurso fue creado exitosamente.");
      return true;
    } catch (error) {
      const message = error.response?.data?.message;
      openSnackbar(message ?? "Ocurrió un error al registrar el recurso.");
      return false;
    } finally {
      dispatch(setLoadingResource(false));
    }
  };

  const startLoadingResourcesPaginated = async () => {
    dispatch(setLoadingResource(true));
    try {
      const limit = rowsPerPage;
      const offset = currentPage * rowsPerPage;
      const { data } = await resourceApi.get("/paginated", 
        getAuthConfigWithParams(token, {
          limit,
          offset,
          search: searchTerm.trim(),
          sortField: orderBy,
          sortOrder: order,
        })
      );
      dispatch(
        refreshResource({
          items: data.items,
          total: data.total,
          page: currentPage,
        })
      );
      return true;
    } catch (error) {
      const message = error.response?.data?.message;
      openSnackbar(message ?? "Ocurrió un error al cargar los recursos.");
      return false;
    } finally {
      dispatch(setLoadingResource(false));
    }
  };

  const startUpdateResource = async (id, resource) => {
    dispatch(setLoadingResource(true));
    try {
      const payload = updateResourceModel(resource)
      await resourceApi.put(`/${id}`, payload, getAuthConfig(token));
      await startLoadingResourcesPaginated();
      openSnackbar("El recurso fue actualizado exitosamente.");
      return true;
    } catch (error) {
      const message = error.response?.data?.message;
      openSnackbar(message ?? "Ocurrió un error al actualizar el recurso.");
      return false;
    } finally {
      dispatch(setLoadingResource(false));
    }
  };

  const startSearchingResource = async (term) => {
    if (term.length !== 12) return;
    dispatch(setLoadingResource(true));
    try {
      const { data } = await resourceApi.get(`/by-serial?serial=${term}`, getAuthConfig(token));
      return { data, ok: true };
    } catch (error) {
      const message = error.response?.data?.message;
      openSnackbar(message ?? "Ocurrió un error al buscar el recurso.");
      return false;
    } finally {
      dispatch(setLoadingResource(false));
    }
  };

  const setSelectedResource = (resource) => {
    dispatch(selectedResource({ ...resource }));
  };

  const setPageGlobal = (page) => {
    dispatch(setPageResource(page));
  };

  const setRowsPerPageGlobal = (rows) => {
    dispatch(setRowsPerPageResource(rows));
  };

  return {
    // state
    resources,
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
    startCreateResource,
    startLoadingResourcesPaginated,
    startUpdateResource,
    setSelectedResource,
    startSearchingResource,
  };
};
