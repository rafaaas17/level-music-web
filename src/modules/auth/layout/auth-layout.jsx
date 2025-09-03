import { Grid, Typography, Box } from "@mui/material";
import { imagen_1 } from '../../../assets/images/carrousel';
import { useTheme } from "@mui/material/styles";
import { Logo } from "../../../shared/ui/components/common/logo";

export const AuthLayout = ({ children, title = '', subtitle = '', isLogin = false }) => {
  const theme = useTheme();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "calc(100vh - 64px)",
        backgroundImage: { md: `url(${imagen_1})`, xs: 'none' },
        padding: 2,
        backgroundSize: "cover",
        backgroundPosition: "center",
         mt: { xs: '5px', md: 0 } 
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "100%", md: "auto" },
          padding: { xs: 2, md: 5 },
          textAlign: "center",
          backgroundColor: { xs: "transparent", md: theme.palette.background.default },
          borderRadius: { md: 8 },
          boxShadow: { md: 3 },
          maxWidth: { md: "50%", lg: "35%" },
        }}
      >
        {isLogin && <Logo />}
        <Typography sx={{ fontSize: isLogin ? 16 : 22, fontWeight: 600, pt: isLogin ? 2 : 0 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 200, py: 2 }}>
          {subtitle}
        </Typography>
        {children}
      </Box>
    </Grid>
  );
};
