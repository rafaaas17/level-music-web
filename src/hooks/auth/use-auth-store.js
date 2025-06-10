import { useDispatch, useSelector } from 'react-redux';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { FirebaseAuth } from '../../modules/auth/firebase/config';
import { 
  checkingCredentials, 
  login, 
  logout,
  showSnackbar
} from '../../store';
import { useUsersStore } from '../../hooks';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
googleProvider.addScope("email");

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const checkingAuthentication = () => dispatch(checkingCredentials());

  const { status, uid, email, displayName, photoURL, role, errorMessage } = useSelector((state) => state.auth);
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
          firstName: null, 
          lastName: null,
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
        const needsPassword = !!data.needs_password_change;
        dispatch(login({
          uid: data.auth_id,
          email: data.email,
          firstName: data.first_name,
          lastName: data.last_name,
          phone: data.phone,
          documentType: data.document_type,
          documentNumber: data.document_number,
          role: data.role,
          needs_password_change: needsPassword,
          userStatus: data.status,
          photoURL: data.profile_picture,
          token: user.accessToken
        }));
        return !needsPassword;
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
      }
      const needsPassword = !!data.needs_password_change;
      dispatch(login({
        uid: data.auth_id,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        phone: data.phone,
        documentType: data.document_type,
        documentNumber: data.document_number,
        role: data.role,
        needs_password_change: needsPassword,
        userStatus: data.status,
        photoURL: data.profile_picture,
        token: user.accessToken
      }));
      return !needsPassword;
    } catch (error) {
      dispatch(logout(error.message));
      if (error.code === "auth/invalid-credential") {
        dispatch(showSnackbar({
          message: 'Credenciales incorrectas',
          severity: 'success',
        }));
      } else {
        dispatch(showSnackbar({
          message: 'Error al iniciar sesión.',
          severity: 'success',
        }));
      }
      return false;
    }
  };

  const startRegisterUser = async ({ email, password }) => {
    try {
      dispatch(checkingCredentials());
      const { ok } = await findUserByEmail(email); 

      if (ok) {
        dispatch(showSnackbar({
          message: 'Este correo ya está registrado.',
          severity: 'success',
        }));
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
        dispatch(showSnackbar({
          message: 'Este correo ya está en uso.',
          severity: 'success',
        }));
      } else {
        dispatch(showSnackbar({
          message: 'Error al crear usuario.',
          severity: 'success',
        }));
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
    role,
    errorMessage,
    checkingAuthentication, 
    onGoogleSignIn, 
    startLogin, 
    startRegisterUser,
    onLogout 
  };
};
