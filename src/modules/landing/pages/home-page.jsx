import React from "react";
import { Typography, Button, Container, Box, Grid, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { LandingLayout } from "../layout/landing-layout";
import { HomeView01, HomeView02, HomeView03, HomeView04 } from "../views/home";

export const HomePage = () => {
  return (
    <>
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        {/* Carrusel */}
        <HomeView01 />
        {/* Aquí puedes agregar más vistas al carrusel en el futuro */}
      </Box>
      <Box sx={{ position: "relative", overflow: "hidden"}}>
        <HomeView02 />
      </Box>
      <Box sx={{ position: "relative", overflow: "hidden"}}>
        <HomeView03 />
      </Box>
      <Box sx={{ position: "relative", overflow: "hidden"}}>
        <HomeView04 />
      </Box>  
    </>
  );
}
