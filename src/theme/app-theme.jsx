import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTheme } from "../store/theme";
import { getTheme } from "./theme";

export const AppTheme = ({ children }) => {
  const { mode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => dispatch(setTheme(e.matches ? "dark" : "light"));
    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [dispatch]);

  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
