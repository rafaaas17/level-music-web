import { useDispatch, useSelector } from "react-redux";
import {
  refreshProvider,
  selectedProvider,
  setLoadingProvider,
  setPageProvider,
  setRowsPerPageProvider,
  showSnackbar,
} from "../../store";
import { createProviderModel, updateProviderModel } from "../../shared/models/provider";
import { useState } from "react";
import { providerApi } from "../../api";

export const useProviderStore = () => {
  const dispatch = useDispatch();
  const {
    provider,
    selected,
    total,
    loading,
    currentPage,
    rowsPerPage,
  } = useSelector((state) => state.provider);

  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const startCreateProvider = async (provider) => {
    dispatch(setLoadingProvider(true));
    try {
      const payload = createProviderModel(provider);
      console.log(payload);
      await providerApi.post("/", payload);
      startLoadingProviderPaginated();
      dispatch(
        showSnackbar({
          message: `El proveedor fue creado exitosamente.`,
          severity: "success",
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar({
          message: `Ocurrió un error al crear el proveedor.`,
          severity: "error",
        })
      );
      return false;
    } finally {
      dispatch(setLoadingProvider(false));
    }
  };

  const startLoadingProviderPaginated = async () => {
    dispatch(setLoadingProvider(true));
    try {
      const limit = rowsPerPage;
      const offset = currentPage * rowsPerPage;
      const { data } = await providerApi.get("/paginated", {
        params: { 
          limit, 
          offset,
          search: searchTerm.trim(), 
          sortField: orderBy, 
          sortOrder: order,  
        },
      });
      dispatch(refreshProvider({
        items: data.items,
        total: data.total,
        page: currentPage,
      }));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      dispatch(setLoadingProvider(false));
    }
  };

  const startUpdateProvider = async (id, provider) => {
    dispatch(setLoadingProvider(true));
    try {
      const payload = updateProviderModel(provider);
      await providerApi.put(`/${id}`, payload);
      startLoadingProviderPaginated();
      dispatch(
        showSnackbar({
          message: `El proveedor fue actualizado exitosamente.`,
          severity: "success",
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar({
          message: `Ocurrió un error al actualizar el proveedor.`,
          severity: "error",
        })
      );
      return false;
    } finally {
      dispatch(setLoadingProvider(false));
    }
  };

  const setSelectedProvider = (provider) => {
    dispatch(selectedProvider({ ...provider }));
  };

  const setPageGlobal = (page) => {
    dispatch(setPageProvider(page));
  };

  const setRowsPerPageGlobal = (rows) => {
    dispatch(setRowsPerPageProvider(rows));
  };

return {

    provider,
    selected,
    total,
    loading,
    searchTerm,
    rowsPerPage,
    currentPage,
    orderBy,
    order,

    setSearchTerm,
    setOrderBy,
    setOrder,
    setPageGlobal,
    setRowsPerPageGlobal,
    
    startCreateProvider,
    startLoadingProviderPaginated,
    startUpdateProvider,
    setSelectedProvider,
    
  };
}
