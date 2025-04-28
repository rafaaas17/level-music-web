import React from 'react';
import { Drawer, Box, List, ListItem, ListItemButton, ListItemText, useTheme, Divider } from '@mui/material';
import { sections } from '../../../constants/custom/nav-sections';
import { Link } from 'react-router-dom';
import { SocialMedia } from '../custom';

export const LandingDrawer = ({ drawerOpen, handleDrawerToggle }) => {
  const theme = useTheme();

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={drawerOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          bgcolor: theme.palette.primary.main,
          color: 'white'
        },
      }}
    >
      <Box 
        sx={{ 
          width: 250, 
          padding: 2, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between', 
          height: '100%' 
        }}
      >
        <List>
          {sections.map((section) => (
            <ListItem key={section.id} disablePadding>
              <ListItemButton
                component={Link} 
                to={section.url} 
                onClick={handleDrawerToggle}
              >
                <ListItemText primary={section.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box>
          <Divider color="white" sx={{ mx: -2, mb: 1 }}/>
          <SocialMedia />
        </Box>
      </Box>
    </Drawer>
  );
};
