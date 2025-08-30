import { AppRouter } from './router/app-router';
import { AppTheme } from './theme';
import { MainLayout } from './shared/ui/layout/main-layout';
import { logCurrentUserToken } from './modules/auth/firebase/config';
import { ExtraInformationModal } from "./modules/auth/components";
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { set } from 'react-hook-form';

export const App = () => {
  
  const { uid } = useSelector(state => state.auth);
  const { extra_data } = useSelector(state => state.auth);
  const [openModal, setOpenModal] = useState(false);
  console.log("extra_data", extra_data);
   useEffect(() => {
    if (uid && extra_data === false) setOpenModal(true);
    else setOpenModal(false);
  }, [uid, extra_data]);
  logCurrentUserToken();
  return (
    <AppTheme>
      <MainLayout>
        <AppRouter />
        <ExtraInformationModal open={openModal} onClose={() => setOpenModal(false)} />
      </MainLayout>
    </AppTheme>
  )
}