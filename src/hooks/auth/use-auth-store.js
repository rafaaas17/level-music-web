import { useDispatch, useSelector } from 'react-redux';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { FirebaseAuth } from '../../modules/auth/firebase/config';
import { checkingCredentials, login, logout } from '../../store/auth';
import { useUsersStore } from '../../hooks';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
googleProvider.addScope("email");

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const checkingAuthentication = () => dispatch(checkingCredentials());

  const { status, uid, email, displayName, photoURL, errorMessage } = useSelector((state) => state.auth);
  const { startCreateUser, findUserByEmail } = useUsersStore();

  const onGoogleSignIn = async () => {
    try {
      dispatch(checkingCredentials());
      const { user } = await signInWithPopup(FirebaseAuth, googleProvider);
      const { data, ok } = await findUserByEmail(user.providerData[0].email); 

      console.log(user)
      if (!ok) {
        const { data: newUser } = await startCreateUser(user, "Cliente", "google");
        dispatch(login({ 
          uid: newUser.auth_id, 
          email: newUser.email, 
          displayName: null, 
          phone: null,
          documentType: null,
          documentNumber: null,
          role: newUser.role,
          userStatus: newUser.status, // Activo, Inactivo
          photoURL: newUser.profile_picture,
          token: user.accessToken
        }));
        return true;
      } else {
        if (data.status === "Inactivo") {
          dispatch(logout({ errorMessage: "Usuario inactivo." }));
          return false;
        } 
        dispatch(login({ 
          uid: data.auth_id, 
          email: data.email, 
          displayName: data.full_name, 
          phone: data.phone,
          documentType: data.document_type,
          documentNumber: data.document_number,
          role: data.role,
          userStatus: data.status, // Activo, Inactivo
          photoURL: data.profile_picture,
          token: user.accessToken
        }));
        return true;
      }
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
      const { data } = await findUserByEmail(user.providerData[0].email); 

      if (data.status === "Inactivo") {
        dispatch(logout({ errorMessage: "Usuario inactivo." }));
        return false;
      } else {
        dispatch(login({ 
          uid: data.auth_id, 
          email: data.email, 
          displayName: data.full_name, 
          phone: data.phone,
          documentType: data.document_type,
          documentNumber: data.document_number,
          role: data.role,
          userStatus: data.status, // Activo, Inactivo
          photoURL: data.profile_picture,
          token: user.accessToken
        }));
        return true;
      }
    } catch (error) {
      console.log(error)
      dispatch(logout(error.message));
      if (error.code === "auth/invalid-credential") {
        dispatch(logout({ errorMessage: "Credenciales incorrectas" }));
      } else {
        dispatch(logout({ errorMessage: "Error al iniciar sesión." }));
      }
      return false;
    }
  };

  const startRegisterUser = async ({ email, password }) => {
    try {
      dispatch(checkingCredentials());
      const { ok } = await findUserByEmail(email); 

      if (ok) {
        dispatch(logout({ errorMessage: "Este correo ya está registrado." }));
        return false;
      } else {
        const { user } = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { data: newUser } = await startCreateUser(user, "Cliente", "email/password");
        dispatch(login({ 
          uid: newUser.auth_id, 
          email: newUser.email, 
          displayName: null, 
          phone: null,
          documentType: null,
          documentNumber: null,
          role: newUser.role,
          userStatus: newUser.status, // Activo, Inactivo
          photoURL: null,
          token: user.accessToken
        }));
        return true;
      }
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
    startRegisterUser,
    onLogout 
  };
};
