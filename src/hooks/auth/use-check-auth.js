import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../../modules/auth/firebase/config";
import { login, logout } from "../../store/auth";

export const useCheckAuth = () => {
  const { status } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FirebaseAuth, (user) => {
      if (!user) return dispatch(logout());
      dispatch(login({ 
        uid: user.uid, 
        email: user.providerData[0].email, 
        photoURL: user.photoURL,
        token: user.accessToken
      }));
    });
    return () => unsubscribe();
  }, [dispatch]);

  return { status };
}