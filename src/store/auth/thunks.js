import { signInWithGoogle, signInWithFacebook, registerUserWithEmailPassword, loginWithEmailPassword, logoutFirebase } from '../../modules/auth/firebase/providers';
import { checkingCredentials, logout, login } from './';
import { apiConfig } from "../../api/api-config";

// Verificar estado de autenticación
export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  }
}

// Iniciar sesión con Google
export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();

    if(!result.ok) return dispatch( logout(result.errorMessage) );

    try {
      const { data } = await apiConfig.post("/auth/google", {
        email: result.email,
        uid: result.uid,
      });

      if (data.necesitaUsername) {
        return dispatch(login({ ...result, necesitaUsername: true }));
      }

      dispatch(login(data.usuario));
    } catch (error) {
      console.error("Error en Google Sign-In:", error);
      dispatch(logout("Error al iniciar sesión con Google"));
    }
  }
}

// Iniciar sesión con Facebook
export const startFacebookSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithFacebook();

    if(!result.ok) return dispatch( logout(result.errorMessage) );

    dispatch(login(result));
  }
}

// Crear usuario con email y contraseña
export const startCreatingUserWithEmailPassword = ({ email, password, displayName, navigate }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

    if(!ok) return dispatch( logout({ errorMessage }) );

    dispatch(login({ uid, displayName, email, photoURL }));
  }
}

// Iniciar sesión con email y contraseña
export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const resp = await loginWithEmailPassword({ email, password });

    if(!resp.ok) return dispatch( logout(resp) );

    dispatch(login(resp));
  }
}

// Cerrar sesión
export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();

    dispatch(logout());
  }
}