import { Box, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import imagen4 from '../../../../assets/images/carrousel/imagen4.jpg';
import imagen7 from '../../../../assets/images/carrousel/imagen7.jpg';  
import imagen11 from '../../../../assets/images/carrousel/imagen11.jpg';

const slides = [
  { src: imagen4, alt: 'evento 1' },
  { src: imagen7, alt: 'evento 2' },
  { src: imagen11, alt: 'evento 3' },
];

export const HomeView03 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ backgroundColor: '#e67e22', py: 12 }}>
      <Container>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' }, color: '#fff', mb: 8 }}
        >
          NUESTROS EVENTOS
        </Typography>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={32}
          slidesPerView={isMobile ? 1 : 3}
          loop
          navigation={!isMobile}
          pagination={isMobile ? { clickable: true } : { clickable: true }}
          className="custom-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box
                component="img"
                src={slide.src}
                alt={slide.alt}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  objectFit: 'cover',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};
