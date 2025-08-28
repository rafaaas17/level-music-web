import { AppRouter } from './router/app-router';
import { AppTheme } from './theme';
import { MainLayout } from './shared/ui/layout/main-layout';
import { logCurrentUserToken } from './modules/auth/firebase/config';
import { ExtraInformationModal } from "./modules/auth/components";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


export const App = () => {
  const [openModal, setOpenModal] = useState(false);
  const { uid } = useSelector(state => state.auth);

  useEffect(() => {
    if (uid) setOpenModal(true);
  }, [uid]);
  logCurrentUserToken();
  return (
    <AppTheme>
      <MainLayout>
        <AppRouter />
        <ExtraInformationModal open={openModal} onClose={() => setOpenModal(false)}/>
      </MainLayout>
    </AppTheme>
  )
}