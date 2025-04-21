import { useDispatch, useSelector } from "react-redux";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { FirebaseAuth } from "../modules/auth/firebase/config";
import { checkingCredentials, login, logout } from "../store/auth";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
googleProvider.addScope("email");

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, uid, email, displayName, photoURL, errorMessage } = useSelector((state) => state.auth);

  const checkingAuthentication = () => dispatch(checkingCredentials());

  const onGoogleSignIn = async () => {
    try {
      dispatch(checkingCredentials());
      const { user } = await signInWithPopup(FirebaseAuth, googleProvider);
      dispatch(login({ 
        uid: user.uid, 
        email: user.providerData[0].email, 
        displayName: user.displayName, 
        photoURL: user.photoURL 
      }));
      return true;
    } catch (error) {
      dispatch(logout(error.message));
      if (error.code === "auth/error-code:-47") {
        dispatch(logout({ errorMessage: "Este correo ya está registrado con otro método de autenticación." }));
      } else {
        dispatch(logout({ errorMessage: "Error al iniciar sesión." }));
      }
      return false;
    }
  };

  const startLogin = async ({ email, password }) => {
    try {
      dispatch(checkingCredentials());
      const { user } = await signInWithEmailAndPassword(FirebaseAuth, email, password);
      dispatch(login({
        uid: user.uid, 
        email: user.email, 
        displayName: user.displayName, 
        photoURL: user.photoURL 
      }));
      return true;
    } catch (error) {
      dispatch(logout(error.message));
      if (error.code === "auth/invalid-credential") {
        dispatch(logout({ errorMessage: "Credenciales incorrectas" }));
      } else {
        dispatch(logout({ errorMessage: "Error al iniciar sesión." }));
      }
      return false;
    }
  };

  const startCreateUser = async ({ email, password }) => {
    try {
      dispatch(checkingCredentials());
      await createUserWithEmailAndPassword(FirebaseAuth, email, password);
      return true;
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        dispatch(logout({ errorMessage: "Este correo ya está en uso." }));
      } else {
        dispatch(logout({ errorMessage: "Error al crear usuario." }));
      }
      return false;
    }
  };

  const onLogout = async () => {
    await signOut(FirebaseAuth);
    dispatch(logout());
  };

  return { 
    status, 
    uid, 
    email, 
    displayName, 
    photoURL, 
    errorMessage,
    checkingAuthentication, 
    onGoogleSignIn, 
    startLogin, 
    startCreateUser,
    onLogout 
  };
};
