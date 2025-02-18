import React from 'react';
import { Drawer, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { sections } from '../../../constants/custom/nav-sections';
import { Link } from 'react-router-dom';

export const CDrawer = ({ drawerOpen, handleDrawerToggle }) => {
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={drawerOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box sx={{ width: 250, padding: 2 }}>
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
      </Box>
    </Drawer>
  );
};
