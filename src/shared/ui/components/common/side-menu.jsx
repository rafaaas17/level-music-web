import { List, ListItem, ListItemIcon, ListItemText, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export const SidebarMenu = ({ menuItems }) => {
  const location = useLocation();
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    const activeAccordion = menuItems.findIndex(item => 
      item.subItems && item.subItems.some(subItem => subItem.href === location.pathname)
    );
    setOpenAccordion(activeAccordion !== -1 ? activeAccordion : null);
  }, [location.pathname, menuItems]);

  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        my: 2,
        mx: 3,
        height: { md: 'calc(100vh - 150px)', xs: 'calc(100vh - 210px)' },
      }}
    >
      {menuItems.map((item, index) => (
        item.subItems ? (
          <Accordion
            key={index}
            disableGutters
            elevation={0}
            square
            expanded={openAccordion === index}
            onChange={() => setOpenAccordion(openAccordion === index ? null : index)}
            sx={{
              backgroundColor: '#FFF9F0',
              borderRadius: '10px',
              overflow: 'hidden',
              transition: 'all 0.3s ease', // Transición suave
              '&:hover': {
                color: 'white',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Sombra al pasar el mouse
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'inherit' }} />}
              sx={{
                textDecoration: 'none',
                color: 'black',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                '&:hover': {
                  backgroundColor: '#EF7E1B',
                  color: 'white',
                  '& .MuiSvgIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'inherit',
                  minWidth: 'auto',
                  marginRight: '8px',
                }}
              >
                {React.createElement(item.icon)}
              </ListItemIcon>
              <Typography
                sx={{
                  flex: 1,
                }}
              >
                {item.text}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: 'white',
                px: '5px',
                '&:first-of-type': {
                  paddingTop: '5px',
                  borderTop: '1px solid #FFF9F1',
                },
                '&:last-of-type': {
                  paddingBottom: '5px',
                },
              }}
            >
              <List
                sx={{
                  padding: 0,
                  margin: 0,
                }}
              >
                {item.subItems.map((subItem, subIndex) => (
                  <ListItem
                    key={subIndex}
                    component={Link}
                    to={subItem.href}
                    sx={{
                      color: location.pathname === subItem.href ? 'white' : 'black',
                      backgroundColor: location.pathname === subItem.href ? '#EF7E1B' : 'transparent',
                      borderRadius: '5px',
                      marginBottom: '5px',
                      boxShadow: location.pathname === subItem.href ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none', // Sombra para el subelemento activo
                      transition: 'all 0.3s ease', // Transición suave
                      '&:hover': {
                        backgroundColor: '#EF7E1B',
                        color: 'white',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Sombra al pasar el mouse
                      },
                      '&:active': {
                        opacity: 0.8, // Efecto de opacidad al hacer clic
                        transform: 'scale(0.98)', // Efecto de reducción al hacer clic
                      },
                      '&:last-of-type': {
                        marginBottom: 0,
                      },
                    }}
                  >
                    <ListItemText 
                      primary={subItem.text} 
                      sx={{
                        fontWeight: location.pathname === subItem.href ? 'bold' : 'normal',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ) : (
          <ListItem
            key={index}
            component={Link}
            to={item.href}
            sx={{
              textDecoration: 'none',
              color: location.pathname === item.href ? 'white' : 'black',
              backgroundColor: location.pathname === item.href ? '#EF7E1B' : '#FFF9F0',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              fontWeight: location.pathname === item.href ? 'bold' : 'normal',
              boxShadow: location.pathname === item.href ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none', // Sombra para el elemento activo
              transition: 'all 0.3s ease', 
              '&:hover': {
                backgroundColor: '#EF7E1B',
                color: 'white',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', 
              },
              '&:active': {
                opacity: 0.8, 
                transform: 'scale(0.98)', 
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 'auto' }}>
              {React.createElement(item.icon)}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        )
      ))}
    </List>
  );
};
