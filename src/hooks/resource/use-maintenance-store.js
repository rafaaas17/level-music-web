import { useDispatch, useSelector } from "react-redux";
import { maintenanceApi } from "../../api";
import {
  refreshMaintenance,
  selectedMaintenance,
  setLoadingMaintenance,
  setPageMaintenance,
  setRowsPerPageMaintenance,
  showSnackbar,
} from "../../store";
import { useState } from "react";

export const useMaintenanceStore = () => {
  const dispatch = useDispatch();
  const {
    maintenances,
    selected,
    total,                                    
    loading,
    currentPage,
    rowsPerPage,
  } = useSelector((state) => state.maintenance);

  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("date");
  const [order, setOrder] = useState("desc");

  const startCreateMaintenance = async (maintenance) => {
    dispatch(setLoadingMaintenance(true));
    try {
      await maintenanceApi.post("/", maintenance);
      await startLoadingMaintenancesPaginated();
      dispatch(
        showSnackbar({
          message: "El mantenimiento fue creado exitosamente.",
          severity: "success",
        })
      );
      return true;
    } catch (error) {
      dispatch(
        showSnackbar({
          message: "Ocurrió un error al crear el mantenimiento.",
          severity: "error",
        })
      );
      return false;
    } finally {
      dispatch(setLoadingMaintenance(false));
    }
  };

  const startLoadingMaintenancesPaginated = async () => {
    dispatch(setLoadingMaintenance(true));
    try {
      const limit = rowsPerPage;
      const offset = currentPage * rowsPerPage;
      const { data } = await maintenanceApi.get("/paginated", {
        params: {
          limit,
          offset,
          search: searchTerm.trim(),
          sortField: orderBy,
          sortOrder: order,
        },
      });
      dispatch(
        refreshMaintenance({
          items: data.items,
          total: data.total,
          page: currentPage,
        })
      );
      return true;
    } catch (error) {
      return false;
    } finally {
      dispatch(setLoadingMaintenance(false));
    }
  };


  const startDeleteMaintenance = async (id) => {
    dispatch(setLoadingMaintenance(true));
    try {
      await maintenanceApi.delete(`/${id}`);
      await startLoadingMaintenancesPaginated();
      dispatch(
        showSnackbar({
          message: "El mantenimiento fue eliminado exitosamente.",
          severity: "success",
        })
      );
      return true;
    } catch (error) {
      dispatch(
        showSnackbar({
          message: "Ocurrió un error al eliminar el mantenimiento.",
          severity: "error",
        })
      );
      return false;
    } finally {
      dispatch(setLoadingMaintenance(false));
    }
  };

  const setSelectedMaintenance = (maintenance) => {
    dispatch(selectedMaintenance({ ...maintenance }));
  };

  const setPageGlobal = (page) => {
    dispatch(setPageMaintenance(page));
  };

  const setRowsPerPageGlobal = (rows) => {
    dispatch(setRowsPerPageMaintenance(rows));
  };

  return {
    // state
    maintenances,
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
    startCreateMaintenance,
    startLoadingMaintenancesPaginated,
    startDeleteMaintenance,
    setSelectedMaintenance,
  };
};
