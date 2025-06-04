import { useDispatch, useSelector } from "react-redux";
import { resourceApi } from "../../api";
import {
  refreshResource,
  selectedResource,
  setLoadingResource,
  setPageResource,
  setRowsPerPageResource,
  showSnackbar,
} from "../../store";
import { useState } from "react";

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

  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const startCreateResource = async (resource) => {
    dispatch(setLoadingResource(true));
    try {
      await resourceApi.post("/", resource);
      await startLoadingResourcesPaginated();
      dispatch(
        showSnackbar({
          message: "El recurso fue creado exitosamente.",
          severity: "success",
        })
      );
      return true;
    } catch (error) {
      dispatch(
        showSnackbar({
          message: "Ocurrió un error al crear el recurso.",
          severity: "error",
        })
      );
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
      const { data } = await resourceApi.get("/paginated", {
        params: {
          limit,
          offset,
          search: searchTerm.trim(),
          sortField: orderBy,
          sortOrder: order,
        },
      });
      dispatch(
        refreshResource({
          items: data.items,
          total: data.total,
          page: currentPage,
        })
      );
      return true;
    } catch (error) {
      return false;
    } finally {
      dispatch(setLoadingResource(false));
    }
  };

  const startUpdateResource = async (id, resource) => {
    dispatch(setLoadingResource(true));
    try {
      await resourceApi.put(`/${id}`, resource);
      await startLoadingResourcesPaginated();
      dispatch(
        showSnackbar({
          message: "El recurso fue actualizado exitosamente.",
          severity: "success",
        })
      );
      return true;
    } catch (error) {
      dispatch(
        showSnackbar({
          message: "Ocurrió un error al actualizar el recurso.",
          severity: "error",
        })
      );
      return false;
    } finally {
      dispatch(setLoadingResource(false));
    }
  };

  const startSearchingResource = async (term) => {
    if (term.length !== 12) return;
    dispatch(setLoadingResource(true));
    try {
      const { data } = await resourceApi.get(`/by-serial?serial=${term}`);
      return { data, ok: true };
    } catch (error) {
      dispatch(
        showSnackbar({
          message: "Ocurrió un error al buscar el recurso.",
          severity: "error",
        })
      );
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
