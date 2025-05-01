import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

const features = [
  {
    title: 'Profesionalismo y Experiencia',
    description:
      'Contamos con años de experiencia en la organización de eventos, brindando servicios profesionales que garantizan la perfecta ejecución de cada evento.',
    icon: <EventAvailableIcon fontSize="large" />,
  },
  {
    title: 'Versatilidad en Eventos',
    description:
      'Atendemos tanto eventos privados como corporativos, adaptando nuestros servicios a cada ocasión para asegurar una experiencia inolvidable.',
    icon: <Diversity3Icon fontSize="large" />,
  },
  {
    title: 'Amplio Catálogo Musical',
    description:
      'Adaptamos cada evento a tus gustos musicales, diseñamos un playlist personalizado que se adapta al estilo y tema de cada evento.',
    icon: <LibraryMusicIcon fontSize="large" />,
  },
];

export const HomeView04 = () => {
  return (
    <Box sx={{ py: 12, backgroundColor: '#ffffff' }}> {/* Further increased py */}
      <Container>
        <Grid container spacing={8} justifyContent="center"> {/* Further increased spacing */}
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={4}
                sx={{
                  p: 6, // Further increased padding
                  borderRadius: 4, // Slightly increased border radius
                  backgroundColor: '#f5f5f5',
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ color: '#000', mb: 2 }}>{feature.icon}</Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }, color: '#000' }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: '0.8rem', sm: '1rem', md: '1.2rem' }, color: '#000' }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
