import { useDispatch, useSelector } from "react-redux";
import { userApi } from "../../api";
import {
  setExtraData,
  setLoadingUser,
  showSnackbar,
} from "../../store";
import { 
  createUserGoogleModel,
  createUserEmailPasswordModel,
  updateExtraDataModel
} from "../../shared/models";
import { getAuthConfig } from "../../shared/utils";

export const useUsersStore = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.users);
  const { token, status } = useSelector((state) => state.auth);

  const openSnackbar = (message) => dispatch(showSnackbar({ message }));

  const startCreateUser = async (user, model) => {
    dispatch(setLoadingUser(true));
    try {
      const modelMap = {
        "google": createUserGoogleModel,
        "email/password": createUserEmailPasswordModel,
      };
      let newUser = modelMap[model](user);
      const { data } = await userApi.post("/client-landing", newUser);
      return { ok: true, data };
    } catch (error) {
      console.log(error);
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

  const startUpdateExtraData = async (id, extraData) => {
    dispatch(setLoadingUser(true));
    try {
      const payload = updateExtraDataModel(extraData);
      const { data } = await userApi.patch(`extra-data/${id}`, payload, getAuthConfig(token));
      dispatch(
        setExtraData({
          firstName: data.first_name,
          lastName: data.last_name,
          phone: data.phone,
          documentType: data.document_type,
          documentNumber: data.document_number
        })
      )
      openSnackbar("Datos actualizados correctamente");
      return true;
    } catch (error) {
      const message = error.response?.data?.message;
      openSnackbar(message ?? "Ocurrió un error al actualizar los datos.");
      return false;
    } finally {
      dispatch(setLoadingUser(false));
    }
  };

  return {
    // state
    loading,
    status,

    // actions
    startCreateUser,
    findUserByEmail,
    startUpdateExtraData
  };
};