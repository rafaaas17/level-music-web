import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const usePersistRoute = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.startsWith('/auth')) {
      sessionStorage.setItem('lastRoute', location.pathname);
    }
  }, [location.pathname]);
};
