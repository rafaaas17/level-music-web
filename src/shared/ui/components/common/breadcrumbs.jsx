import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

export const Breadcrumbs = ({ menuItems, homeLabel = 'Inicio', homeHref = '/admin' }) => {
  const location = useLocation();

  if (location.pathname === '/admin') {
    return null;
  }

  const findMenuItem = (path) => {
    for (const item of menuItems) {
      if (item.href === path) return item; 
      if (item.subItems) {
        const subItem = item.subItems.find((sub) => sub.href === path); 
        if (subItem) return subItem;
      }
    }
    return null; 
  };

  const buildBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);

    return pathnames.map((_, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      const menuItem = findMenuItem(to);

      if (menuItem) {
        if (menuItem.href === homeHref) {
          return null;
        }

        return (
          <Link
            key={to}
            underline="hover"
            color="inherit"
            href={to}
            sx={{
              fontWeight: 500,
              fontSize: '18px',
              color: '#000',
              textDecoration: 'underline',
            }}
          >
            {menuItem.breadcrumb} 
          </Link>
        );
      }

      return null; 
    }).filter(Boolean); 
  };

  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      separator="›"
      sx={{
        mb: 2,
        '& .MuiBreadcrumbs-separator': {
          fontSize: '18px',
        },
      }}
    >
      <Link 
        underline="hover" 
        color="inherit" 
        href={homeHref}
        sx={{
          fontWeight: 500,
          fontSize: '18px',
          textDecoration: 'none',
        }}
      >
        {homeLabel}
      </Link>
      {buildBreadcrumbs()}
    </MuiBreadcrumbs>
  );
};
