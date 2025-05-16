import React, { useRef } from 'react';
import { useScreenSizes } from '../../../../shared/constants/screen-width';
import {
  Box,
  Typography,
  Button,
  useTheme
} from '@mui/material';
import { 
  imagen_1, 
  imagen_2, 
  imagen_3 
} from '../../../../assets/images/carrousel';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Importa el módulo Autoplay
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import '../../../../styles.css'

const SlideContent = ({ image, title, subtitle, buttonText, isSecondSlide = false, isFirstSlide = false, isThirdSlide = false }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '35vh', sm: '50vh', md: '75vh', lg: '93vh' },
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        px: 2,
        '&::before': !isFirstSlide
          ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : undefined, 
              zIndex: 1,
            }
          : undefined, 
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
          objectFit: 'cover',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          mt: isThirdSlide ? { xs: 0, md: '-30vh', lg: '-40vh' } : 5, 
          mb: isSecondSlide ? { xs: 0, md: '-35vh', lg: '-45vh' } : 0, 
          maxWidth: { xs: '90%', sm: '80%', lg: '40%' },
        }}
      >
        <Typography sx={{ fontSize: { xs: 15, sm: 18, md: 20, lg: 35 }, fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography sx={{ mt: 2, fontSize: { xs: 10, sm: 12, md: 15, lg: 20 } }}>
          {subtitle}
        </Typography>
        {buttonText && (
          <Button
            variant="text"
            color="primary"
            sx={{
              pt: 1,
              px: 2,
              mt: 3,
              textTransform: 'none',
              fontSize: { xs: 10, sm: 12, md: 14, lg: 16 },
              '&:hover': {
                backgroundColor: theme.palette.primary.hover,
              },
              backgroundColor: theme.palette.primary.main,
              color: 'white',
            }}
          >
            {buttonText}
          </Button>
        )}
      </Box>
    </Box>
  );
};

const slides = [
  {
    image: imagen_1,
    title: '¡Haz de tu evento una experiencia inolvidable!',
    subtitle: 'Sonido, luces y ambientación profesional para eventos.',
    buttonText: 'Solicitar Cotización',
  },
  {
    image: imagen_2,
    title: 'Producción de Audio y Sonido Profesional',
    subtitle: 'Sonido en vivo · Iluminación LED · Pantallas LED',
    buttonText: 'Ver Servicios',
  },
  {
    image: imagen_3,
    title: 'Tu Playlist, Nuestra Mezcla',
    subtitle: 'Envíanos tu lista de canciones y creamos la atmósfera perfecta para tu evento.',
  },
];

export const HomeView01 = () => {
  const { isXs } = useScreenSizes();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const theme = useTheme();

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
