import { useDispatch, useSelector } from 'react-redux';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updatePassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { FirebaseAuth } from '../../modules/auth/firebase/config';
import { 
  checkingCredentials, 
  login, 
  logout,
  showSnackbar,
  authenticated
} from '../../store';
import { useUsersStore } from '../../hooks';
import { userApi } from '../../api';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
googleProvider.addScope("email");

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { 
    status, 
    uid, 
    email, 
    displayName, 
    photoURL, 
    role 
  } = useSelector((state) => state.auth);

  const { startCreateUser, findUserByEmail } = useUsersStore();

  const openSnackbar = (message) => dispatch(showSnackbar({ message }));

  const onGoogleSignIn = async () => {
    try {
      dispatch(checkingCredentials());
      const { user } = await signInWithPopup(FirebaseAuth, googleProvider);
      const { data, ok } = await findUserByEmail(user.providerData[0].email); 

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
          dispatch(logout());
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
      dispatch(logout());
      if (error.code === "auth/error-code:-47") {
        openSnackbar("Este correo ya está registrado con otro método de autenticación.");
      } else {
        openSnackbar("Error al iniciar sesión.");
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
        dispatch(logout());
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
      dispatch(logout());
      if (error.code === "auth/invalid-credential") {
        openSnackbar("Credenciales incorrectas.");
      } else {
        openSnackbar("Error al iniciar sesión.");
      }
      return false;
    }
  };

  const startRegisterUser = async ({ email, password }) => {
    try {
      dispatch(checkingCredentials());
      const { ok } = await findUserByEmail(email); 

      if (ok) {
        dispatch(logout());
        openSnackbar("Este correo ya está registrado.");
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
      dispatch(logout());
      if (error.code === "auth/email-already-in-use") {
        openSnackbar("Este correo ya está en uso.");
      } else {
        openSnackbar("Error al crear usuario.");
      }
      return false;
    }
  };

  const onLogout = async () => {
    await signOut(FirebaseAuth);
    dispatch(logout());
  };

  const startChangePassword = async ({ password, confirmPassword }) => {
    if (password !== confirmPassword) {
      openSnackbar("Las contraseñas no coinciden.");
      return false;
    }

    try {
      const user = FirebaseAuth.currentUser;
      await updatePassword(user, password);
      await userApi.patch(`/reset-password-flag/${uid}`);
      dispatch(authenticated());
      openSnackbar("Contraseña actualizada exitosamente.");
      return true;
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        openSnackbar("Por seguridad, vuelve a iniciar sesión para cambiar tu contraseña.");
      } else {
        openSnackbar("Error al cambiar la contraseña.");
      }
      return false;
    }
  }

  const startPasswordReset = async (data) => {
    try {
      console.log("startPasswordReset", data);
      dispatch(checkingCredentials());

      // Toma la URL base desde variables de entorno
      const appUrl = import.meta.env.VITE_APP_URL;

      await sendPasswordResetEmail(FirebaseAuth, data.email, {
        url: appUrl, // Firebase redirige aquí después del clic en el correo
      });

      openSnackbar("Se envió un enlace para restablecer tu contraseña a tu correo.");
      return true;
    } catch (error) {
      console.error(error);
      if (error.code === "auth/user-not-found") {
        openSnackbar("No existe una cuenta con ese correo.");
      } else if (error.code === "auth/invalid-email") {
        openSnackbar("El email no es válido.");
      } else {
        openSnackbar("Error al enviar el correo de restablecimiento.");
      }
      return false;
    }
  };

  return { 
    // state
    status, 
    uid, 
    email, 
    displayName, 
    photoURL, 
    role,
    
    // actions
    onGoogleSignIn, 
    startLogin, 
    startRegisterUser,
    onLogout,
    startChangePassword,
    startPasswordReset
  };
};
