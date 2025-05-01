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
        height: 'calc(100vh - 150px)',
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
                      '&:hover': {
                        backgroundColor: '#EF7E1B',
                        color: 'white',
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
              '&:hover': {
                backgroundColor: '#EF7E1B',
                color: 'white',
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
