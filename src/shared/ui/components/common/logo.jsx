import { Typography, useTheme, Box } from '@mui/material';

export const Logo = () => {
  const theme = useTheme();

  return (
    <Box 
      component="a" 
      href="/" 
      sx={{
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex',
        flexGrow: { md: 0, xs: 1 }
      }}
    >
      {/* Imagen del logo */}
      <Box
        component="img"
        src="./logo.png"
        alt="Logo Level Music"
        sx={{
          width: { md: 45, xs: 40 }, 
          height: { md: 40, xs: 35 },
          mr: 2,
        }}
      />

      {/* Texto del logo */}
      <Typography 
        variant="h6" 
        sx={{
          fontSize: { md: '1.2rem', xs: '1rem'},
          fontWeight: 700,
          letterSpacing: '.2rem',
          textDecoration: 'none',
          color: theme.palette.text.primary,
        }}
      >
        LEVEL MUSIC
      </Typography>
    </Box>
  );
};
