import { useDispatch, useSelector } from 'react-redux';
import { eventTypeApi } from '../../api';
import {
  refreshEventType,
  selectedEventType,
  setLoadingEventType,
  setPageEventType,
  setRowsPerPageEventType,
  showSnackbar,
} from '../../store';
import { 
  createEventTypeModel,
  updateEventTypeModel
} from '../../shared/models';
import { useState } from 'react';

export const useEventTypeStore = () => {
  const dispatch = useDispatch();
  const { 
    eventType, 
    selected, 
    total, 
    loading, 
    currentPage, 
    rowsPerPage 
  } = useSelector((state) => state.eventType);

  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('description');
  const [order, setOrder] = useState('asc');

  const startCreateEventType = async (eventType) => {
    dispatch(setLoadingEventType(true));
    try {
      const payload = createEventTypeModel(eventType);
      await eventTypeApi.post('/', payload);
      startLoadingEventTypePaginated();
      dispatch(showSnackbar({
        message: `El tipo de evento fue creado exitosamente.`,
        severity: 'success',
      }));
      return true;
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({
        message: `Ocurrió un error al crear el tipo de evento.`,
        severity: 'error', 
      }));
      return false;
    } finally {
      dispatch(setLoadingEventType(false));
    }
  };

  const startLoadingEventTypePaginated = async () => {
    dispatch(setLoadingEventType(true));
    try {
      const limit  = rowsPerPage;
      const offset = currentPage * rowsPerPage;
      const { data } = await eventTypeApi.get('/paginated', {
        params: {
          limit,
          offset,
          search: searchTerm.trim(),
          sortField: orderBy,
          sortOrder: order,
        },
      });
      dispatch(refreshEventType({
        items: data.items,
        total: data.total,
        page:  currentPage,
      }));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      dispatch(setLoadingEventType(false));
    }
  };

  const startUpdateEventType = async (id, eventType) => {
    dispatch(setLoadingEventType(true));
    try {
      const payload = updateEventTypeModel(eventType);
      await eventTypeApi.put(`/${id}`, payload);
      startLoadingEventTypePaginated();
      dispatch(showSnackbar({
        message: `El tipo de evento fue actualizado exitosamente.`,
        severity: 'success',
      }));
      return true;
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({
        message: `Ocurrió un error al actualizar el tipo de evento.`,
        severity: 'error', 
      }));
      return false;
    } finally {
      dispatch(setLoadingEventType(false));
    }
  };

  const setSelectedEventType = (eventType) => {
    // Si no hay eventType, limpiar el seleccionado
    if (!eventType) {
      dispatch(selectedEventType(null));
    } else {
      dispatch(selectedEventType({ ...eventType }));
    }
  };

  const setPageGlobal = (page) => {
    dispatch(setPageEventType(page));
  };

  const setRowsPerPageGlobal = (rows) => {
    dispatch(setRowsPerPageEventType(rows));
  };

  return {
    // state
    eventType,
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
    startCreateEventType,
    startLoadingEventTypePaginated,
    startUpdateEventType,
    setSelectedEventType,
  };
};