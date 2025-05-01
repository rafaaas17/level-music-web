import { Container, Typography, Box } from '@mui/material';

export const HomeView02 = () => {
  return (
    <Box sx={{ backgroundColor: '#ffffff', py: 6 }}>
      <Container maxWidth="lg">
        {/* Fondo gris claro para la sección */}
        <Box
          sx={{
            backgroundColor: '#e0e0e0',
            borderRadius: 3,
            px: { xs: 3, md: 6 },
            py: { xs: 4, md: 6 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 4,
          }}
        >
          {/* Texto a la izquierda */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, color: '#000000' }}
            >
              ACERCA DE NOSOTROS
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' }, maxWidth: 500, color: '#000000' }}
            >
              Desde 2018, en Level Music ofrecemos soluciones audiovisuales de última generación para tus eventos.
              Con un equipo de expertos altamente calificados, nos dedicamos a transformar cada celebración en una experiencia memorable.
              Nos comprometemos contigo en cada paso, garantizando el éxito absoluto de tu evento.
            </Typography>
          </Box>

          {/* Imágenes a la derecha (una encima de otra en desktop, responsive) */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row', md: 'column' },
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              component="img"
              src="/src/assets/images/carrousel/imagen4.jpg"
              alt="equipo"
              sx={{
                width: { xs: '100%', sm: '45%', md: '80%' },
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
            <Box
              component="img"
              src="/src/assets/images/carrousel/imagen1.jpg"
              alt="evento"
              sx={{
                width: { xs: '100%', sm: '45%', md: '80%' },
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
