import { useMediaQuery, useTheme } from '@mui/material';

export const useScreenSizes = () => {
  const theme = useTheme();
  
  return {
    isXs: useMediaQuery(theme.breakpoints.down('sm')), // menor a 600px
    isSm: useMediaQuery(theme.breakpoints.up('sm')), // mayor o igual a 600px
    isMd: useMediaQuery(theme.breakpoints.up('md')), // mayor o igual a 900px
    isLg: useMediaQuery(theme.breakpoints.up('lg')), // mayor o igual a 1200px
    isXl: useMediaQuery(theme.breakpoints.up('xl')), // mayor o igual a 1536px
  };
};