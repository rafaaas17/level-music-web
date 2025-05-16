import { Facebook, Instagram, WhatsApp } from '@mui/icons-material';
import { Box, Typography, IconButton } from '@mui/material';
import React from 'react';

const socialLinks = [
  { href: 'https://www.instagram.com', icon: <Instagram /> },
  { href: 'https://www.facebook.com', icon: <Facebook /> },
  { href: 'https://wa.me/51989160593', icon: <WhatsApp /> },
];

export const SocialMedia = () => {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 0.5, // Reduce el espacio entre los íconos
      }}
    >
      {socialLinks.map((link, index) => (
        <IconButton
          key={index}
          component="a"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          {link.icon}
        </IconButton>
      ))}
      <Typography sx={{ fontSize: 14 }}>
        +51 989160593
      </Typography>
    </Box>
  );
};
