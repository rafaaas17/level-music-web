import { useDispatch, useSelector } from "react-redux";
import { userApi } from "../../api";
import {
  setLoadingUser,
  showSnackbar,
} from "../../store";
import { 
  createUserGoogleModel,
  createUserEmailPasswordModel,
} from "../../shared/models";

export const useUsersStore = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.users);

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

  return {
    // state
    loading,

    // actions
    startCreateUser,
    startCreateUserFromAdmin,
    findUserByEmail
  };
};