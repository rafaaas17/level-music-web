import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../modules/auth/firebase/config";
import { login, logout } from "../store/auth";

export const useCheckAuth = () => {
  const { status } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FirebaseAuth, (user) => {
      if (!user) return dispatch(logout());
      const { displayName, email, photoURL, uid } = user;
      dispatch(login({ displayName, email, photoURL, uid }));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return { status };
}