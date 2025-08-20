// src/modules/landing/views/events/05-events-view.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  Paper,
  useTheme,
} from "@mui/material";

export const EventsView05 = () => {
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: lógica de envío si la necesitas
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: theme.palette.primary.main,
        py: { xs: 6, md: 8 },
      }}
    >
      <Container>
        <Box
        component={"div"}
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          alignItems: "center",
          gap: { xs: 4, md: 6 },
          maxWidth: { xs: "100%", md: "95%" },
          justifyContent: "center",
          mx: "auto",
        }}
        >            
        {/* Texto grande a la izquierda */}
        <Box sx={{ textAlign: { xs: "center", md: "center" } }}>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 600,
              lineHeight: 1.2,
              fontSize: { xs: 28, sm: 36, md: 44 },
            }}
          >
{`¿Quieres
Ser
Nuestro
Próximo
Cliente?`}
          </Typography>
        </Box>

        {/* Tarjeta del formulario a la derecha */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3 },
            borderRadius: 2,
            backgroundColor:
            theme.palette.mode === "light" ? "#F4F4F4" : "#1F1F1F",
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          {/* Título con subrayado */}
          <Box sx={{ mb: { xs: 2, sm: 3 } }}>
            <Typography sx={{ fontSize: { xs: 18, sm: 22 }, fontWeight: 600 }}>
              Contáctanos
            </Typography>
            <Box
              sx={{
                mt: 0.5,
                width: 140,
                height: 3,
                borderRadius: 2,
                backgroundColor: theme.palette.primary.main,
              }}
            />
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "stretch",
                minWidth: 0,
              }}
            >
              {/* Columna izquierda: Nombre + Correo */}
              <Box sx={{ flex: 1, minWidth: 0, pr: { sm: 2 } }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="Nombre*"
                    name="name"
                    required
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label="Correo Electrónico*"
                    name="email"
                    type="email"
                    required
                    fullWidth
                    size="small"
                  />
                </Box>
              </Box>

              {/* Divisor: vertical en sm+, horizontal en xs */}
              <Box
                sx={{
                  px: { sm: 1.5 },
                  my: { xs: 2, sm: 0 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    display: { xs: "none", sm: "block" },
                    borderColor: theme.palette.text.disabled,
                    opacity: 0.6,
                  }}
                />
                <Divider
                  flexItem
                  sx={{
                    display: { xs: "block", sm: "none" },
                    width: "100%",
                    borderColor: theme.palette.text.disabled,
                    opacity: 0.6,
                  }}
                />
              </Box>

              {/* Columna derecha: Mensaje + botón */}
              <Box sx={{ flex: 1, minWidth: 0, pl: { sm: 2 } }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="Mensaje*"
                    name="message"
                    required
                    fullWidth
                    multiline
                    minRows={6}
                    size="small"
                  />
                  <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      sx={{
                        textTransform: "none",
                        borderRadius: 1.5,
                        px: 2,
                        backgroundColor: theme.palette.primary.main,
                        "&:hover": { backgroundColor: theme.palette.primary.hover },
                        color: "#fff",
                      }}
                    >
                      Enviar mensaje
                    </Button>
                  </Box>
                </Box>
              </Box>
              
            </Box>
          </Box>
        </Paper>
        </Box>
      </Container>
    </Box>
  );
};
