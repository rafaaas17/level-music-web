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
  const { token } = useSelector((state) => state.auth);
  const openSnackbar = (message) => dispatch(showSnackbar({ message }));

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
      const message = error.response?.data?.message;
      openSnackbar(message ?? "Ocurrió un error al registrar el cliente.");
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

  const updateUserExtraData = async (id, data) => {
    console.log("iD", id)
  try {
    const { data: response } = await userApi.patch(`extra-data/${id}`, data,
    { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!response) {
      return { ok: false, data: null };
    }
    return { ok: true, data: response };
  } catch (error) {
    return false;
  }
};

  return {
    // state
    loading,
    updateUserExtraData,
    // actions
    startCreateUser,
    findUserByEmail
  };
};