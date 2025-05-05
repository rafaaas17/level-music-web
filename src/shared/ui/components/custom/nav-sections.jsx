import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { sections } from '../../../constants/custom/nav-sections';
import { useAuthStore } from '../../../../hooks'; 

export const NavSections = () => {
  const { status } = useAuthStore();

  return (
    <Box sx={{ flexGrow: 1, display: { lg: 'flex', xs: 'none' }, ml: 2 }}>
      {sections
        .filter((section) => !(status === 'authenticated' && section.id === 1)) 
        .map((section) => (
          <Button
            key={section.id}
            component={Link}
            to={section.url}
            sx={{
              color: 'white',
            }}
          >
            {section.title}
          </Button>
        ))}
    </Box>
  );
};
