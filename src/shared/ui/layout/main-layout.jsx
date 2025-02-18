import React from 'react';
import { NavBar, Footer } from '../components/common';

export const MainLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};