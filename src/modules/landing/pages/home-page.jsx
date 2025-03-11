import React from "react";
import { Typography, Button, Container, Box, Grid, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { LandingLayout } from "../layout/landing-layout";

export const HomePage = () => {
  return (
    <>
      <Box sx={{ bgcolor: "#FFF", py: 10, textAlign: "center", mt: 10 }}>
        <>
          <Typography variant="h3" gutterBottom sx={{ color: "#1D478A" }}>
            Organiza Eventos Inolvidables
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: "#003B4A" }}>
            Producción musical y planificación de eventos de alto nivel
          </Typography>
          <Button component={Link} variant="contained" to="/auth/login" sx={{ bgcolor: "#1D478A", color: "#FFF" }} size="large">
            Contáctanos
          </Button>
        </>
      </Box>
      <Container sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {["Producción Profesional", "Sonido de Calidad", "Eventos Exclusivos"].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ bgcolor: "#FFF" }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ color: "#1D478A" }}>
                    {feature}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#003B4A" }}>
                    Ofrecemos {feature.toLowerCase()} para todos nuestros clientes.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ bgcolor: "#EEE", py: 10, textAlign: "center" }}>
        <Container>
          <Typography variant="h4" gutterBottom sx={{ color: "#1D478A" }}>
            Lo que dicen nuestros clientes
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: "#003B4A" }}>
            El mejor servicio para eventos, impecable organización y música de alta calidad
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#1D478A" }}>
          ¿Listo para organizar tu evento soñado?
        </Typography>
        <Button variant="contained" sx={{ bgcolor: "#003B4A", color: "#FFF" }} size="large">
          Reserva ahora
        </Button>
      </Container>
    </>
  );
} 
