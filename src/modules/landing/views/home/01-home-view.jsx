import React from 'react';
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import imagen1 from '../../../../assets/images/carrousel/imagen_1.png';
import imagen2 from '../../../../assets/images/carrousel/imagen_2.jpg';
import imagen3 from '../../../../assets/images/carrousel/imagen_3.jpg';

const SlideContent = ({ image, title, subtitle, buttonText }) => (
  <Box
    sx={{
      position: 'relative',
      height: { xs: '55vh', sm: '70vh', lg: '90vh' }, // Increased heights
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      textAlign: 'center',
      px: 2,
    }}
  >
    <Box
      component="img"
      src={image}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover', // Ensure the image covers the entire space
        zIndex: -1,
      }}
    />
    <Typography
      variant="h3"
      fontWeight="bold"
      sx={{ fontSize: { xs: 15, sm: 20, lg: 25 } }}
    >
      {title}
    </Typography>
    <Typography
      variant="subtitle1"
      sx={{ mt: 2, fontSize: { xs: 10, sm: 15, lg: 20 } }}
    >
      {subtitle}
    </Typography>
    {buttonText && (
      <Button
        variant="contained"
        sx={{
          mt: 4,
          backgroundColor: '#f27024',
          color: '#fff',
          px: 3,
          py: 1,
          fontSize: { xs: '0.8rem', sm: '1rem' },
        }}
      >
        {buttonText}
      </Button>
    )}
  </Box>
);

export const HomeView01 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%' }}>
      <Swiper
        modules={[Navigation, Pagination]}
        loop
        navigation={!isMobile}
        pagination={isMobile ? { clickable: true } : { clickable: true }}
        style={{ height: '100%', background: 'white' }}
        className="custom-swiper"
      >
        <SwiperSlide>
          <SlideContent
            image={imagen1}
            title="Producción de Audio y Sonido Profesional"
            subtitle="Sonido en vivo · Iluminación LED · Pantallas LED"
            buttonText="Ver Servicios"
          />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent
            image={imagen2}
            title="Tu Playlist, Nuestra Mezcla"
            subtitle="“Envíanos tu lista de canciones y creamos la atmósfera perfecta para tu evento.”"
          />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent
            image={imagen3}
            title="Tu Playlist, Nuestra Mezcla"
            subtitle="“Envíanos tu lista de canciones y creamos la atmósfera perfecta para tu evento.”"
          />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};
