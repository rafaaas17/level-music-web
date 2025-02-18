import { apiConfig } from "../../api/api-config";
import { checkingCredentials, login, logout } from "./auth-slice";

// Verificar estado de autenticación
export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

// Iniciar sesión con email y contraseña
export const startLogin = ({ email, password, navigate }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    try {
      const { data } = await apiConfig.post("/auth/login", { email, password });

      if (data.success) {
        dispatch(login({ user: data.user, token: data.token }));
        sessionStorage.setItem("token", data.token);

        navigate("/admin");
      } else {
        dispatch(logout({ errorMessage: data.message }));
      }
    } catch (error) {
      console.error("Error en login:", error);
      dispatch(logout({ errorMessage: error.response.data.message }));
    }
  };
};

// Registrar un nuevo usuario
export const startRegister = ({ username, email, mobile, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    try {
      const { data } = await apiConfig.post("/auth/register", {
        username,
        email,
        mobile,
        password,
      });

      if (data.success) {
        dispatch(login({ user: data.user, token: data.token }));
        sessionStorage.setItem("token", data.token);
      } else {
        dispatch(logout({ errorMessage: data.message }));
      }
    } catch (error) {
      console.error("Error en registro:", error);
      dispatch(logout({ errorMessage: "Error al registrar usuario" }));
    }
  };
};

// Cerrar sesión
export const startLogout = (navigate) => {
  return (dispatch) => {
    sessionStorage.removeItem("token"); 
    dispatch(logout());
    navigate("/auth/login", { replace: true }); 
  };
};

// Verificar si el usuario sigue autenticado
export const fetchUserDetails = () => {
  return async (dispatch) => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        dispatch(logout());
        return;
      }

      const { data } = await apiConfig.get("/auth/get-userDetails", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        dispatch(login({ user: data.user, token }));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.error("Error obteniendo datos del usuario:", error);

      if (error.response?.status === 401) {
        sessionStorage.removeItem("token");
        dispatch(logout());
      }
    }
  };
};
