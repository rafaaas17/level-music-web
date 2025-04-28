import { NavBar, Footer } from '../components/common';
import { useLocation } from 'react-router-dom';

export const MainLayout = ({ children }) => {
  const location = useLocation(); 

  const hideFooter = location.pathname.startsWith('/admin') 
                  || location.pathname.startsWith('/cliente');

  return (
    <>
      <NavBar />
      {children}
      {!hideFooter && (
        <Footer />
      )}
    </>
  );
};