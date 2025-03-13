import { Grid, Typography, Box, Paper } from "@mui/material";
import backgroundImage from '../../../assets/images/carrousel/imagen_1.png';
import { useTheme } from "@mui/material/styles";
import { Logo } from "../../../shared/ui/components/common/logo";

export const AuthLayout = ({ children, title = '', subtitle = '' }) => {
  const theme = useTheme();

  const content = (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
          mb: 2,
          color: theme.palette.text.secondary
        }}
      >
        <Logo />
        <Typography sx={{ fontSize: 20, fontWeight: 600, pt: 2 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 200 }}>
          {subtitle}
        </Typography>
      </Box>
      {children}
    </>
  );

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "calc(100vh - 64px)",
        backgroundImage: { md: `url(${backgroundImage})`, xs: 'none'},
        padding: 2,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Versión móvil */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          width: '100%',
          padding: 2,
        }}
      >
        {content}
      </Box>

      {/* Versión desktop */}
      <Paper
        sx={{
          display: { xs: 'none', md: 'flex' },
          padding: 5,
          textAlign: "center",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "64px",
          borderRadius: 8,
          backgroundColor: theme.palette.background.default,
          width: { md: '50%', lg: '35%' }
        }}
      >
        {content}
      </Paper>
    </Grid> 
  );
};
