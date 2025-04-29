import { Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components";

export const NotFoundView = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClick = () => {
    navigate("/")
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 70px)",
        textAlign: "center",
        backgroundColor: "background.default",
      }}
    >
      <Typography sx={{ fontSize: "6rem", fontWeight: "bold" }}>
        404
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Lo sentimos, la página que buscas no existe.
      </Typography>
      <Button
        variant="text"
        color="primary"
        onClick={handleClick}
        sx={{
          mt: 1,
          padding: "10px",
          textTransform: "none",
          fontSize: 16,
          "&:hover": {
            backgroundColor: theme.palette.primary.hover,
          },
          backgroundColor: theme.palette.primary.main,
          color: "white",
        }}
      >
        Volver al Inicio
      </Button>
    </Box>
  );
};