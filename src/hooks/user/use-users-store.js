import { useDispatch, useSelector } from "react-redux";
import { userApi } from "../../api";
import {
  refreshUsers,
  selectedUser,
  setLoadingUser,
  setPageUser,
  setRowsPerPageUser,
  showSnackbar,
} from "../../store";
import { 
  createUserGoogleModel,
  createUserEmailPasswordModel,
  updateUserModel
} from "../../shared/models";
import { useState } from "react";

export const useUsersStore = () => {
  const dispatch = useDispatch();
  const { 
    users, 
    selected,
    total,
    loading,
    currentPage,
    rowsPerPage
  } = useSelector((state) => state.users);

  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');

  const startCreateUser = async (user, role, model) => {
    dispatch(setLoadingUser(true));
    try {
      const modelMap = {
        "google": createUserGoogleModel,
        "email/password": createUserEmailPasswordModel,
      };
      let newUser = modelMap[model](user, role);
      const { data } = await userApi.post("/", newUser);
      return { ok: true, data };
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({
        message: `Ocurrió un error al crear el usuario.`,
        severity: 'error', 
      }));
      return false;
    } finally {
      dispatch(setLoadingUser(false));
    }
  };

  const startCreateUserFromAdmin = async (user, role) => {
    dispatch(setLoadingUser(true));
    try {
      const newUser = createUserEmailPasswordModel(user, role, { needs_password_change: true });
      await userApi.post("/", newUser);
      startLoadingUsersPaginated();
      dispatch(showSnackbar({
        message: `El usuario fue creado exitosamente.`,
        severity: 'success',
      }));
      return true;
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({
        message: `Ocurrió un error al crear el usuario.`,
        severity: 'error', 
      }));
      return false;
    } finally {
      dispatch(setLoadingUser(false));
    }
  }

  const startLoadingUsersPaginated = async () => {
    dispatch(setLoadingUser(true));
    try {
      const limit  = rowsPerPage;
      const offset = currentPage * rowsPerPage;
      const { data } = await userApi.get('/paginated', {
        params: {
          limit,
          offset,
          search: searchTerm.trim(),
          sortField: orderBy,
          sortOrder: order,
        },
      });
      dispatch(refreshUsers({
        items: data.items,
        total: data.total,
        page:  currentPage,
      }));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      dispatch(setLoadingUser(false));
    }
  };

  const startUpdateUser = async (id, user) => {
    dispatch(setLoadingUser(true));
    try {
      const payload = updateUserModel(user);
      await userApi.put(`/${id}`, payload);
      startLoadingUsersPaginated();
      dispatch(showSnackbar({
        message: `El usuario fue actualizado exitosamente.`,
        severity: 'success',
      }));
      return true;
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({
        message: `Ocurrió un error al actualizar el usuario.`,
        severity: 'error', 
      }));
      return false;
    } finally {
      dispatch(setLoadingUser(false));
    }
  };

  const findUserByEmail = async (email) => {
    try {
      const { data } = await userApi.get(`find/${email}`);
      if (!data) {
        return { ok: false, data: null };
      }
      return { ok: true, data };
    } catch (error) {
      return false;
    }
  }

  const setSelectedUser = (user) => {
    dispatch(selectedUser({ ...user })); 
  };

  const setPageGlobal = (page) => {
    dispatch(setPageUser(page));
  };

  const setRowsPerPageGlobal = (rows) => {
    dispatch(setRowsPerPageUser(rows));
  };

  return {
    // state
    users,
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
    startCreateUser,
    startCreateUserFromAdmin,
    startLoadingUsersPaginated,
    startUpdateUser,
    setSelectedUser,
    findUserByEmail
  };
};