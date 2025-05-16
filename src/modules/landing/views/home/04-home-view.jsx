import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import React from 'react';

const features = [
  {
    title: 'Experiencia Profesional',
    description:
      'Contamos con años de experiencia en la organización de eventos, brindando servicios profesionales de sonido e iluminación para garantizar el éxito de tu evento.', 
    icon: <EventAvailableIcon fontSize="large" />,
  },
  {
    title: 'Versatilidad en Eventos',
    description:
      'Atendemos tanto eventos privados como corporativos, adaptando nuestros servicios a cada ocasión para asegurar una experiencia única y memorable para todos.',
    icon: <Diversity3Icon fontSize="large" />,
  },
  {
    title: 'Amplio Catálogo Musical',
    description:
      'Adaptamos cada evento a tus gustos musicales, diseñamos un playlist personalizado que se adapta al estilo y tema de cada evento para crear la atmósfera perfecta.',
    icon: <LibraryMusicIcon fontSize="large" />,
  },
];

export const HomeView04 = () => {
  const theme = useTheme();

  return (
    <Container
      sx={{
        pt: { xs: 4, md: 8 },
        pb: { xs: 2, md: 4, lg: 8 },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
        <style>
          {`
            .swiper-pagination-bullet {
              background-color:rgb(204, 204, 204) !important; /* Puntos no seleccionados con color claro del tema */
              opacity: 1 !important;
              width: 10px;
              height: 10px;
              margin: 0 5px;
              border-radius: 50%;
              transition: transform 0.3s ease, background-color 0.3s ease;
            }
            .swiper-pagination-bullet-active {
              background-color: ${theme.palette.primary.main} !important; /* Puntos seleccionados con color principal del tema */
              transform: scale(1.2); /* Agranda el punto seleccionado */
            }
          `}
        </style>
        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
          spaceBetween={24}
          slidesPerView={2}
          breakpoints={{
            0: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
          }}
          style={{
            paddingBottom: '50px',
          }}
        >
          {features.map((feature, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  backgroundColor: theme.palette.mode === 'light' ? '#e0e0e0' : '#1F1F1F',
                  p: { xs: 4, md: 6 },
                  borderRadius: 4,
                  textAlign: 'center',
                  height: { xs: '160px', sm: '200px', lg: '240px' },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  color: theme.palette.text.primary,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Box>
                  {React.cloneElement(feature.icon, {
                    fontSize: 'inherit',
                    sx: { fontSize: { xs: 35, sm: 40, md: 60 } },
                  })}
                </Box>
                <Typography sx={{ fontSize: { xs: 16, sm: 16, md: 22 }}}>
                  {feature.title}
                </Typography>
                <Typography sx={{ fontSize: { xs: 12, sm: 12, md: 14 } }}>
                  {feature.description}
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Box
        spacing={8}
        justifyContent="center"
        sx={{
          display: { xs: 'none', lg: 'flex' },
          gap: 4,
        }}
      >
        {features.map((feature, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: theme.palette.mode === 'light' ? '#e0e0e0' : '#1F1F1F',
              p: 6,
              borderRadius: 4,
              textAlign: 'center',
              height: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              color: theme.palette.text.primary,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box sx={{ mb: 2 }}>
              {React.cloneElement(feature.icon, {
                fontSize: 'inherit',
                sx: { fontSize: { xs: 40, sm: 50, md: 60 } },
              })}
            </Box>
            <Typography sx={{ fontSize: 22, mb: 2 }}>
              {feature.title}
            </Typography>
            <Typography sx={{ fontSize: 18 }}>
              {feature.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
};
