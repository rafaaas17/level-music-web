import { useDispatch, useSelector } from 'react-redux';
import { workerTypeApi } from '../../api';
import {
  refreshWorkerTypes,
  selectedWorkerType,
  setLoadingWorkerType,
  setPageWorkerType,
  setRowsPerPageWorkerType,
  showSnackbar,
} from '../../store';
import { 
  createWorkerTypeModel,
  updateWorkerTypeModel
} from '../../shared/models';
import { useState } from 'react';

export const useWorkerTypeStore = () => {
  const dispatch = useDispatch();
  const { 
    workerTypes, 
    selected, 
    total, 
    loading, 
    currentPage, 
    rowsPerPage 
  } = useSelector((state) => state.workerTypes);

  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');

  const startCreateWorkerType = async (workerType) => {
    dispatch(setLoadingWorkerType(true));
    try {
      const payload = createWorkerTypeModel(workerType);
      await workerTypeApi.post('/', payload);
      startLoadingWorkerTypePaginated();
      dispatch(showSnackbar({
        message: `El tipo de trabajador fue creado exitosamente.`,
        severity: 'success',
      }));
      return true;
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({
        message: `Ocurrió un error al crear el tipo de trabajador.`,
        severity: 'error', 
      }));
      return false;
    } finally {
      dispatch(setLoadingWorkerType(false));
    }
  };

  const startLoadingWorkerTypePaginated = async () => {
    dispatch(setLoadingWorkerType(true));
    try {
      const limit  = rowsPerPage;
      const offset = currentPage * rowsPerPage;
      const { data } = await workerTypeApi.get('/paginated', {
        params: {
          limit,
          offset,
          search: searchTerm.trim(),
          sortField: orderBy,
          sortOrder: order,
        },
      });
      dispatch(refreshWorkerTypes({
        items: data.items,
        total: data.total,
        page:  currentPage,
      }));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      dispatch(setLoadingWorkerType(false));
    }
  };

  const startUpdateWorkerType = async (id, workerType) => {
    dispatch(setLoadingWorkerType(true));
    try {
      const payload = updateWorkerTypeModel(workerType);
      await workerTypeApi.put(`/${id}`, payload);
      startLoadingWorkerTypePaginated();
      dispatch(showSnackbar({
        message: `El tipo de trabajador fue actualizado exitosamente.`,
        severity: 'success',
      }));
      return true;
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({
        message: `Ocurrió un error al actualizar el tipo de trabajador.`,
        severity: 'error', 
      }));
      return false;
    } finally {
      dispatch(setLoadingWorkerType(false));
    }
  };

  const startDeleteWorkerType = async (id) => {
    dispatch(setLoadingWorkerType(true));
    try {
      await workerTypeApi.delete(`/${id}`);
      startLoadingWorkerTypePaginated();
      dispatch(showSnackbar({
        message: `El tipo de trabajador fue eliminado exitosamente.`,
        severity: 'success',
      }));
      return true;
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({
        message: `Ocurrió un error al eliminar el tipo de trabajador.`,
        severity: 'error',
      }));
      return false;
    } finally {
      dispatch(setLoadingWorkerType(false));
    }
  };

  const setSelectedWorkerType = (workerType) => {
    dispatch(selectedWorkerType({ ...workerType })); 
  };

  const setPageGlobal = (page) => {
    dispatch(setPageWorkerType(page));
  };

  const setRowsPerPageGlobal = (rows) => {
    dispatch(setRowsPerPageWorkerType(rows));
  };

  return {
    // state
    workerTypes,
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
    startCreateWorkerType,
    startLoadingWorkerTypePaginated,
    startUpdateWorkerType,
    startDeleteWorkerType,
    setSelectedWorkerType,
  };
};