import React from 'react';
import { Drawer, Box, List, ListItem, ListItemButton, ListItemText, useTheme, Divider } from '@mui/material';
import { sections } from '../../../constants/custom/nav-sections';
import { Link } from 'react-router-dom';
import { WhatsApp, Instagram, Facebook } from '@mui/icons-material';

export const CDrawer = ({ drawerOpen, handleDrawerToggle }) => {
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
          <Box
            component={"div"}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              paddingY: 2
            }}
          >
            <Instagram />
            <Facebook />
            <WhatsApp />
            +51 989160593
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};
