import { AppRouter } from './router/app-router';
import { AppTheme } from './theme';
import { MainLayout } from './shared/ui/layout/main-layout';
import { logCurrentUserToken } from './modules/auth/firebase/config';
import { ExtraInformationModal } from "./modules/auth/components";
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export const App = () => {
  
  const { uid } = useSelector(state => state.auth);
  const { extra_data } = useSelector(state => state.auth);

  const showExtraModal = !!uid && extra_data === false;
  const location = useLocation();
  const navigate = useNavigate();
  const lockedPath = useRef(null);
  useEffect(() => {
    if (showExtraModal && !lockedPath.current) {
      lockedPath.current = location.pathname;
    }
    // Limpia cuando se cierra el modal o se desloguea
    if (!showExtraModal) {
      lockedPath.current = null;
    }
  }, [showExtraModal, location.pathname]);


  // Bloquea la navegación mientras el modal está abierto
  useEffect(() => {
    if (showExtraModal && lockedPath.current && location.pathname !== lockedPath.current) {
      navigate(lockedPath.current, { replace: true });
    }
  }, [showExtraModal, location.pathname, navigate]);

  logCurrentUserToken();
  return (
    <AppTheme>
      <MainLayout>
        <AppRouter />
        <ExtraInformationModal open={showExtraModal}/>
      </MainLayout>
    </AppTheme>
  )
}