import { Box, IconButton } from '@mui/material';
import { Menu, AccountCircle } from '@mui/icons-material';

export const MenuDrawer = ({ handleDrawerToggle, type }) => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}>
      <IconButton
        size="large"
        aria-label="menu"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleDrawerToggle}
        sx={{ color: 'white' }}
      >
        { (type === 'menu') ? <Menu /> : <AccountCircle /> }
      </IconButton>
    </Box>
  );
};
