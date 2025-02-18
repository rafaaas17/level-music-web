import { Box, Button, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { sections } from '../../../constants/custom/nav-sections';

export const NavSections = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, display: { md: 'flex', xs: 'none' }, ml: 2 }}>
      {sections.map((section) => (
        <Button
          key={section.id}
          component={Link}
          to={section.url}
          sx={{
            color: theme.palette.text.primary,
          }}
        >
          {section.title}
        </Button>
      ))}
    </Box>
  );
};
