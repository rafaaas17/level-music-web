import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../../modules/auth/firebase/config";
import { login, logout } from "../../store/auth";
import { useUsersStore } from "../";
import { checkingCredentials } from "../../store";

export const useCheckAuth = () => {
  const { status } = useSelector(state => state.auth);
  const { findUserByEmail } = useUsersStore();
  const dispatch = useDispatch();
  //aca tengo que modificar para agregar un estado de verificado si esta completado o no la informacion extra
  useEffect(() => {
    dispatch(checkingCredentials());
    const unsubscribe = onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { data } = await findUserByEmail(user.providerData[0].email);
      console.log('User extra data:', data.extraData);
      if (data?.status === "Inactivo") {
        dispatch(logout());
        return;
      }

      dispatch(login({ 
        uid: data.auth_id, 
        email: data.email, 
        firstName: data.first_name || null, 
        lastName: data.last_name || null,
        phone: data.phone || null,
        documentType: data.document_type || null,
        documentNumber: data.document_number || null,
        role: data.role,
        needs_password_change: data.needs_password_change || null,
        userStatus: data.status, // Activo, Inactivo
        photoURL: data.profile_picture || null,
        token: user.accessToken,
        //nuevo campo  de redux para almacenar la inforamcion sera un booleano
        extra_data: data.extraData
      }));
    });
    
    return () => unsubscribe();
  }, [dispatch]);

  return { status };
}