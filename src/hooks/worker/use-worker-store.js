import { useDispatch, useSelector } from 'react-redux';
import { workerApi } from '../../api';
import {
  refreshWorkers,
  selectedWorker,
  setLoadingWorker,
  setPageWorker,
  setRowsPerPageWorker,
  showSnackbar,
} from '../../store';
import { 
  createWorkerModel,
  updateWorkerModel
} from '../../shared/models';
import { generateRandomPassword } from '../../shared/utils';
import { useState } from 'react';

export const useWorkerStore = () => {
  const dispatch = useDispatch();
  const {
    workers,
    selected,
    total,
    loading,
    currentPage,
    rowsPerPage,
  } = useSelector((state) => state.workers);

  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const startCreateWorker = async (worker) => {
      dispatch(setLoadingWorker(true));
      try {
        const password = generateRandomPassword();
        const payload = createWorkerModel(worker, password);
        await workerApi.post('/', payload);
        startLoadingWorkerPaginated();
        dispatch(showSnackbar({
          message: `El trabajador fue creado exitosamente.`,
          severity: 'success',
        }));
        return true;
      } catch (error) {
        console.log(error);
        dispatch(showSnackbar({
          message: `Ocurrió un error al crear el trabajador.`,
          severity: 'error', 
        }));
        return false;
      } finally {
        dispatch(setLoadingWorker(false));
      }
    };

  const startLoadingWorkerPaginated = async () => {
    dispatch(setLoadingWorker(true));
    try {
      const limit = rowsPerPage;
      const offset = currentPage * rowsPerPage;
      const { data } = await workerApi.get("/paginated", {
        params: {
          limit,
          offset,
          search: searchTerm.trim(),
          sortField: orderBy,
          sortOrder: order,
        },
      });
      dispatch(
        refreshWorkers({
          items: data.items,
          total: data.total,
          page: currentPage,
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      dispatch(setLoadingWorker(false));
    }
  };

  const startUpdateWorker = async (id, worker) => {
    dispatch(setLoadingWorker(true));
    try {
      const payload = updateWorkerModel(worker);
      await workerApi.put(`/${id}`, payload);
      startLoadingWorkerPaginated();
      dispatch(showSnackbar({
        message: `El trabajador fue actualizado exitosamente.`,
        severity: 'success',
      }));
      return true;
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({
        message: `Ocurrió un error al actualizar el trabajador.`,
        severity: 'error', 
      }));
      return false;
    } finally {
      dispatch(setLoadingWorker(false));
    }
  }

  const setSelectedWorker = (worker) => {
    dispatch(selectedWorker({ ...worker }));
  };

  const setPageGlobal = (page) => {
    dispatch(setPageWorker(page));
  };

  const setRowsPerPageGlobal = (rows) => {
    dispatch(setRowsPerPageWorker(rows));
  };

  return {
    // state
    workers,
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

    //actions
    startCreateWorker,
    startLoadingWorkerPaginated,
    startUpdateWorker,
    setSelectedWorker,
  };
};
