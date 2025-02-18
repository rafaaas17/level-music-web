import * as React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Container, 
  useTheme
} from '@mui/material';
import { Logo, CDrawer } from './';
import { NavSections, AuthButtons, ToogleTheme, MenuDrawer } from '../custom';
import { useScreenSizes } from '../../../constants/screen-width';

export const NavBar = () => {
  const theme = useTheme();
  const { isMd } = useScreenSizes();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Menu Drawer (para el tamaño de ipad) */}
          {!isMd && <MenuDrawer handleDrawerToggle={handleDrawerToggle} />}
          
          {/* Logo */}
          <Logo />

          {/* Sections */}
          <NavSections />

          {/* Toogle theme */}
          <ToogleTheme />

          {/* Login & Register Buttons */}
          <AuthButtons />

        </Toolbar>
      </Container>

      {/* Drawer del landing */}
      <CDrawer drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
    </AppBar>
  );
};

