import { useDispatch, useSelector } from "react-redux";
import { 
  startGoogleSignIn, 
  startFacebookSignIn, 
  startCreatingUserWithEmailPassword, 
  startLoginWithEmailPassword, 
  startLogout 
} from "../store/auth/thunks";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  const onFacebookSignIn = () => {
    dispatch(startFacebookSignIn());
  };

  const startCreateUser = async ({ email, password, displayName, navigate }) => {
    try {
      await dispatch(startCreatingUserWithEmailPassword({ email, password, displayName, navigate }));
      return true;
    } catch (error) {
      return false;
    }
  };

  const startLogin = async ({ email, password }) => {
    try {
      await dispatch(startLoginWithEmailPassword({ email, password }));
      return true;
    } catch (error) {
      return false;
    }
  };

  const onLogout = async () => {
    try {
      await dispatch(startLogout());
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    // Atributos
    status,
    errorMessage,
    // Métodos
    onGoogleSignIn,
    onFacebookSignIn,
    startCreateUser,
    startLogin,
    onLogout,
  };
}; 