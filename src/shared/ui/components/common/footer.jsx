import { Box, Container, Typography, useTheme } from "@mui/material";
import { SocialMedia } from "../custom";

export const Footer = () => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        backgroundColor: theme.palette.footer.main,
        color: "white", 
        py: 3, 
        textAlign: "center" 
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 14 }}>
          &copy; 2025 Level Music Corp. Todos los derechos reservados.
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <SocialMedia />
        </Box>
      </Container>
    </Box>
  );
}