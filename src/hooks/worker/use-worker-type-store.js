import { useDispatch, useSelector } from 'react-redux';
import { workerTypeApi } from '../../api';
import {
  refreshWorkerTypes,
  selectedWorkerType,
  setLoading,
  setPage,
  setRowsPerPage,
  showSnackbar,
} from '../../store';
import { 
  createWorkerTypeModel,
  updateWorkerTypeModel
} from '../../shared/models';
import { useState } from 'react';

export const useWorkerTypesStore = () => {
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
    dispatch(setLoading(true));
    try {
      const payload = createWorkerTypeModel(workerType);
      await workerTypeApi.post('/', payload);
      startLoadingWorkerTypesPaginated();
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
      dispatch(setLoading(false));
    }
  };

  const startLoadingWorkerTypesPaginated = async () => {
    dispatch(setLoading(true));
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
      dispatch(setLoading(false));
    }
  };

  const startUpdateWorkerType = async (id, workerType) => {
    dispatch(setLoading(true));
    try {
      const payload = updateWorkerTypeModel(workerType);
      await workerTypeApi.put(`/${id}`, payload);
      startLoadingWorkerTypesPaginated();
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
      dispatch(setLoading(false));
    }
  };

  const startDeleteWorkerType = async (id) => {
    dispatch(setLoading(true));
    try {
      await workerTypeApi.delete(`/${id}`);
      startLoadingWorkerTypesPaginated();
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
      dispatch(setLoading(false));
    }
  };

  const setSelectedWorkerType = (workerType) => {
    dispatch(selectedWorkerType({ ...workerType })); 
  };

  const setPageGlobal = (page) => {
    dispatch(setPage(page));
  };

  const setRowsPerPageGlobal = (rows) => {
    dispatch(setRowsPerPage(rows));
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
    startLoadingWorkerTypesPaginated,
    startUpdateWorkerType,
    startDeleteWorkerType,
    setSelectedWorkerType,
  };
};